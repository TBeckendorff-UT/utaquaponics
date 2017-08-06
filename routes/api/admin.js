var express = require('express'),
    router = express.Router(),
    path = require('path'),
    logger = require('../../logger'),
    tokenHandler = require('../../models/api/tokenHandler');

var ROUTE = "admin";
var LOG_TAG = {tag: ROUTE};

/**
 * @api {get} /api/admin Request Admin Panel
 * @apiName GetAdmin
 * @apiGroup Admin
 * @apiPermission admin
 *
 * @apiSuccess {File} AdminPanel The Administrative Panel for Managing the UT Aquaponics Web Application.
 * @apiError {File} Homepage Redirects to the Homepage of the UT Aquaponics Web Application.
 */
router.get('/', function(req, res) {
    tokenHandler.validJSONWebToken(req.session, function(valid) {
       if (valid) {
           logger.info('Sending the admin panel.', LOG_TAG);
           return res.sendFile(path.resolve(__dirname + '/../../admin-panel.html'));
       } else {
           logger.info('Sending the index page.', LOG_TAG);
           return res.sendFile(path.resolve(__dirname + '/../../index.html'));
       }
    });
});

module.exports = router;