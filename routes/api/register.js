var express = require('express'),
    router = express.Router(),
    logger = require('../../logger'),
    Configuration = require('../../configuration'),
    REST = require('../../models/api/rest'),
    User = require('../../models/db/user');

var ROUTE = "register";
var LOG_TAG = {tag: ROUTE};

/**
 * @api {post} /api/register Register
 * @apiName Register
 * @apiGroup Register
 * @apiPermission Registration Key Required & Development Mode Enabled
 *
 * @apiExample Registration Schema
 * {
 *      "username": "administrator",
 *      "password": "fishy",
 *      "registration_key": "UTRocks"
 * }
 *
 * @apiSuccess {User} User The user registered. Note: Password field is not sent for security purposes.
 *
 * @apiSuccessExample Response Example
 * "response": {
 *      "message": "Welcome! You've been successfully registered.",
 *      "data": {
 *          "__v": 0,
 *          "username": "username",
 *          "_id": "57c2560a9f8d16fc037d7cbf"
 *      },
 *      "code": "400",
 *      "route": "register",
 *      "timestamp": "Sat Aug 27 2016 22:10:03 GMT-0500 (Central Daylight Time)"
 * }
 */
router.post('/', function(req, res) {
    logger.log('warn', 'User Registration Requested', LOG_TAG);
    var form = req.body;
    logger.log('debug', form, LOG_TAG);
    if (validRegistrationForm(form)) {
        var username = form.username;
        var password = form.password;
        var registrationKey = form.registration_key;
        if (inDevelopmentMode()) {
            if (validRegistrationKey(registrationKey)) {
                User.find({username: username}, function (err, user) {
                    if (err) {
                        res.json(REST.USERNAME_TAKEN(ROUTE));
                    }
                    if (user.username == null) {
                        var user = new User({username: username, password: password});
                        user.save(function (err, user) {
                            if (err) {
                                res.json(REST.USERNAME_TAKEN(ROUTE));
                            } else {
                                user.password = undefined;
                                res.json(REST.USER_REGISTERED(user, ROUTE));
                            }
                        });
                    } else {
                        res.json(REST.USERNAME_TAKEN(ROUTE));
                    }
                });
            } else {
                logger.log('warn', 'Sending invalid registration key error', LOG_TAG);
                res.json(REST.INVALID_REGISTRATION_KEY(ROUTE));
            }
        } else {
            logger.log('warn', 'Sending registration disabled error', LOG_TAG);
            res.json(REST.REGISTRATION_DISABLED(ROUTE));
        }
    } else {
        logger.log('warn', 'Sending invalid registration error', LOG_TAG);
        res.json(REST.INVALID_REGISTRATION(ROUTE));
    }
});

function validRegistrationForm(form) {
    logger.log('debug', 'Validating registration form', LOG_TAG);
    return (form.username != null && form.password != null && form.registration_key != null);
}

function inDevelopmentMode() {
    logger.log('debug', 'Checking if in development mode', LOG_TAG);
    return process.env.NODE_ENV === 'development';
}

function validRegistrationKey(key) {
    return key === Configuration.REGISTRATION_KEY;
}
module.exports = router;