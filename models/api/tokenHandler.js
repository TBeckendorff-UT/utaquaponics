var jwt = require('jsonwebtoken'),
    logger = require('../../logger'),
    Configuration = require('../../configuration');

var tokenHandler = function() {};

var LOG_TAG = {tag: 'tokenHandler'};

tokenHandler.prototype.validJSONWebToken = function(session, callback) {
    logger.log('debug', 'Validating JSON Web Token', LOG_TAG);
    if (session != null && session.token != null) {
        jwt.verify(session.token, Configuration.SECRET_TOKEN, function(err, decoded) {
            if (err) {
                logger.log('error', err, LOG_TAG);
                callback(false);
            } else {
                logger.log('debug', 'JSON Web Token is valid', LOG_TAG);
                callback(true);
            }
        });
    } else {
        callback(false);
    }
};

tokenHandler.prototype.setToken = function(user, session) {
    logger.log('debug', 'Setting JSON Web Token', LOG_TAG);
    var token = jwt.sign(user, Configuration.SECRET_TOKEN, {
        expiresIn:12000
    });
    session.token = token;
};

tokenHandler.prototype.destroyToken = function(session) {
    logger.log('debug', 'Destroying JSON Web Token and Session', LOG_TAG);
    session.destroy(function(err) {
        if (err) {
            logger.log('error', err, LOG_TAG);
        }
    });
};

module.exports = new tokenHandler();
