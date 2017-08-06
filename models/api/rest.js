var Constants = require('./constants');

var REST = function() {};

REST.prototype.buildResponse = function(message, data, code, route) {
    return {
        "response": {
            "message": message,
            "data": data,
            "code": code,
            "route": route,
            "timestamp": new Date().toString()
        }
    };
};

REST.prototype.buildError = function(message, description, code, route) {
    return {
        "error": {
            "message": message,
            "description": description,
            "code": code,
            "route": route,
            "timestamp": new Date().toString()
        }
    };
};

REST.prototype.INTERNAL_ERROR = function(route) {
    return REST.prototype.buildError (
        Constants.MESSAGE_INTERNAL_ERROR,
        Constants.DESCRIPTION_INTERNAL_ERROR,
        Constants.CODE_INTERNAL_ERROR,
        route
    );
};

REST.prototype.USERNAME_TAKEN = function(route) {
    return REST.prototype.buildError (
        Constants.MESSAGE_USERNAME_TAKEN,
        Constants.DESCRIPTION_USERNAME_TAKEN,
        Constants.CODE_USERNAME_TAKEN,
        route
    );
};

REST.prototype.USER_REGISTERED = function(user, route) {
    return REST.prototype.buildResponse (
        Constants.MESSAGE_USER_REGISTERED,
        user,
        Constants.CODE_USER_REGISTERED,
        route
    );
};

REST.prototype.REGISTRATION_DISABLED = function(route) {
    return REST.prototype.buildError (
        Constants.MESSAGE_REGISTRATION_DISABLED,
        Constants.DESCRIPTION_REGISTRATION_DISABLED,
        Constants.CODE_REGISTRATION_DISABLED,
        route
    );
};

REST.prototype.INVALID_REGISTRATION = function(route) {
    return REST.prototype.buildError (
        Constants.MESSAGE_INVALID_REGISTRATION_FORM,
        Constants.DESCRIPTION_INVALID_REGISTRATION_FORM,
        Constants.CODE_INVALID_REGISTRATION_FORM,
        route
    );
};


REST.prototype.INVALID_REGISTRATION_KEY = function(route) {
    return REST.prototype.buildError (
        Constants.MESSAGE_INVALID_REGISTRATION_KEY,
        Constants.DESCRIPTION_INVALID_REGISTRATION_KEY,
        Constants.CODE_INVALID_REGISTRATION_KEY,
        route
    );
};

REST.prototype.AUTH_FAILED = function(route) {
    return REST.prototype.buildError (
        Constants.MESSAGE_AUTH_FAILED,
        Constants.DESCRIPTION_AUTH_FAILED,
        Constants.CODE_AUTH_FAILED,
        route
    );
};

REST.prototype.INVALID_TOKEN = function(route) {
    return REST.prototype.buildError (
        Constants.MESSAGE_INVALID_TOKEN,
        Constants.DESCRIPTION_INVALID_TOKEN,
        Constants.CODE_INVALID_TOKEN,
        route
    );
};

REST.prototype.LOGOUT = function(route) {
    return REST.prototype.buildResponse (
        Constants.MESSAGE_LOGOUT,
        "",
        Constants.CODE_LOGOUT,
        route
    );
};

REST.prototype.REQUEST_PROCESSED = function(route, data) {
    return REST.prototype.buildResponse(
        Constants.MESSAGE_REQUEST_PROCESSED,
        data,
        Constants.CODE_REQUEST_PROCESSED,
        route
    );
};

REST.prototype.SENSOR_DOES_NOT_EXIST = function(route) {
    return REST.prototype.buildError(
        Constants.MESSAGE_SENSOR_DOES_NOT_EXIT,
        Constants.DESCRIPTION_SENSOR_DOES_NOT_EXIST,
        Constants.CODE_SENSOR_DOES_NOT_EXIST,
        route
    );
};

REST.prototype.INVALID_SENSOR = function(route) {
    return REST.prototype.buildError (
        Constants.MESSAGE_INVALID_SENSOR,
        Constants.DESCRIPTION_INVALID_SENSOR,
        Constants.CODE_INVALID_SENSOR,
        route
    );
};

REST.prototype.SENSOR_SAVED = function(route, sensor) {
    return REST.prototype.buildResponse (
        Constants.MESSAGE_SENSOR_SAVED,
        sensor,
        Constants.CODE_SENSOR_SAVED,
        route
    );
};

REST.prototype.SENSOR_REMOVED = function(route, sensor) {
    return REST.prototype.buildResponse(
        Constants.MESSAGE_SENSOR_REMOVED,
        sensor,
        Constants.CODE_SENSOR_REMOVED,
        route
    );
};

REST.prototype.SENSOR_UPDATED = function(route, sensor) {
    return REST.prototype.buildResponse(
        Constants.MESSAGE_SENSOR_UPDATED,
        sensor,
        Constants.CODE_SENSOR_UPDATED,
        route
    );
};

REST.prototype.READING_DOES_NOT_EXIST = function(route) {
    return REST.prototype.buildError(
        Constants.MESSAGE_READING_DOES_NOT_EXIT,
        Constants.DESCRIPTION_READING_DOES_NOT_EXIST,
        Constants.CODE_READING_DOES_NOT_EXIST,
        route
    );
};

REST.prototype.INVALID_READING = function(route) {
    return REST.prototype.buildError (
        Constants.MESSAGE_INVALID_READING,
        Constants.DESCRIPTION_INVALID_READING,
        Constants.CODE_INVALID_READING,
        route
    );
};

REST.prototype.READING_SAVED = function(route, reading) {
    return REST.prototype.buildResponse(
        Constants.MESSAGE_READING_SAVED,
        reading,
        Constants.CODE_READING_SAVED,
        route
    );
};

REST.prototype.IMAGE_DOES_NOT_EXIST = function(route) {
    return REST.prototype.buildError(
        Constants.MESSAGE_IMAGE_DOES_NOT_EXIST,
        Constants.DESCRIPTION_IMAGE_DOES_NOT_EXIST,
        Constants.CODE_IMAGE_DOES_NOT_EXIST,
        route
    );
};

REST.prototype.INVALID_IMAGE = function(route) {
    return REST.prototype.buildError (
        Constants.MESSAGE_INVALID_IMAGE,
        Constants.DESCRIPTION_INVALID_IMAGE,
        Constants.CODE_INVALID_IMAGE,
        route
    );
};

REST.prototype.IMAGE_SAVED = function(route, image) {
    return REST.prototype.buildResponse(
        Constants.MESSAGE_IMAGE_SAVED,
        image,
        Constants.CODE_IMAGE_SAVED,
        route
    );
};

REST.prototype.READING_UPDATED = function(route, image) {
    return REST.prototype.buildResponse(
        Constants.MESSAGE_READING_UPDATED,
        image,
        Constants.CODE_READING_UPDATED,
        route
    );
};

REST.prototype.READING_REMOVED = function(route, image) {
    return REST.prototype.buildResponse(
        Constants.MESSAGE_READING_REMOVED,
        image,
        Constants.CODE_READING_REMOVED,
        route
    );
};


REST.prototype.IMAGE_UPDATED = function(route, image) {
    return REST.prototype.buildResponse(
        Constants.MESSAGE_IMAGE_UPDATED,
        image,
        Constants.CODE_IMAGE_UPDATED,
        route
    );
};

REST.prototype.IMAGE_REMOVED = function(route, image) {
    return REST.prototype.buildResponse(
        Constants.MESSAGE_IMAGE_REMOVED,
        image,
        Constants.CODE_IMAGE_REMOVED,
        route
    );
};


module.exports = new REST();