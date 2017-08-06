var express = require('express'),
    router = express.Router(),
    logger = require('../../logger'),
    REST = require('../../models/api/rest'),
    tokenHandler = require('../../models/api/tokenHandler');

var ROUTE = 'logout';
var LOG_TAG = {tag: ROUTE};

/**
 * @api /api/logout Logout
 * @apiName Logout
 * @apiGroup Logout
 * @apiPermission admin
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {String} response.data "".
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 */
router.post('/logout', function(req, res) {
    tokenHandler.destroyToken(req.session);
    logger.info('Sending logout response', LOG_TAG);
    return res.json(REST.LOGOUT(ROUTE));
});

module.exports = router;
