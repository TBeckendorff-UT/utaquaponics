var express = require('express'),
    router = express.Router(),
    logger = require('../../logger'),
    REST = require('../../models/api/rest'),
    User = require('../../models/db/user'),
    tokenHandler = require('../../models/api/tokenHandler');

var ROUTE = 'login';
var LOG_TAG = {tag: ROUTE};

/**
 * @api {get} /api/login Login
 * @apiName GetLogin
 * @apiGroup Login
 * @apiPermission none
 *
 * @apiSuccess {File} Homepage Redirects to the Homepage of the UT Aquaponics Web Application.
 */
router.get('/', function(req, res) {
    logger.log('warn', 'Redirecting Request to Login.', LOG_TAG);
    return res.sendFile(path.resolve(__dirname + '/../../index.html'));
});

/**
 * @api {post} /api/login Login
 * @apiName PostLogin
 * @apiGroup Login
 * @apiPermission admin
 *
 * @apiExample Login Schema
 * {
 *      "username": "administrator",
 *      "password": "fishy"
 * }
 *
 * @apiSuccess {Redirect} AdminPanel Redirects to the Administrative Panel for Managing the UT Aquaponics Web
 * Application.
 */
router.post('/', function(req, res) {
    var form = req.body;
    if (validLoginForm(form)) {
        var username = form.username;
        var password = form.password;
        User.findOne({username: username.toLowerCase()}, function(err, user) {
            if (err) {
                logger.log('warn', 'Sending auth failed error', LOG_TAG);
                res.json(REST.AUTH_FAILED(ROUTE));
            }
            if (user) {
                user.comparePassword(password, function(err, isMatch) {
                    if (err) {
                        logger.log('warn', 'Sending auth failed error', LOG_TAG);
                        res.json(REST.AUTH_FAILED(ROUTE));
                    }
                    if (isMatch) {
                        tokenHandler.setToken(user, req.session);
                        res.redirect('admin');
                    } else {
                        logger.log('warn', 'Sending auth failed error', LOG_TAG);
                        res.json(REST.AUTH_FAILED(ROUTE));
                    }
                });
            } else {
                logger.log('warn', 'Sending auth failed error', LOG_TAG);
                res.json(REST.AUTH_FAILED(ROUTE));
            }
        });
    } else {
        logger.log('warn', 'Sending internal error', LOG_TAG);
        res.json(REST.INTERNAL_ERROR(ROUTE));
    }
});

function validLoginForm(form) {
    logger.log('debug', 'Validating login form', LOG_TAG);
    return (form.username != null && form.password != null);
}

module.exports = router;
