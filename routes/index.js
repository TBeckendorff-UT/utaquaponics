var express = require('express'),
    router = express.Router(),
    path = require('path'),
    logger = require('../logger'),
    api = require('./api');

var ROUTE = 'index';
var LOG_TAG = {tag: ROUTE};

router.use('/api', api);

/**
 * @api {get} / Request Homepage
 * @apiName GetHomepage
 * @apiGroup Main
 * @apiPermission none
 *
 * @apiSuccess {File} Homepage Redirects to the Homepage of the UT Aquaponics Web Application.
 */
router.get('/', function(req, res) {
    logger.info('Sending index page', LOG_TAG);
    res.sendFile(path.resolve(__dirname + '/../index.html'));
});

/**
 * @api {get} * Resource Does Not Exist
 * @apiName ResourceDoesNotExist
 * @apiGroup Main
 * @apiPermission none
 *
 * @apiSuccess {File} 404Page Sends the 404 Page of the UT Aquaponics Web Application.
 */
router.get('*', function(req, res) {
    logger.info('Sending 404 page', LOG_TAG);
    res.status(404).sendFile(path.resolve(__dirname + '/../404.html'));
});

module.exports = router;