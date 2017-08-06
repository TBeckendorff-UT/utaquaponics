var express = require('express'),
    router = express.Router(),
    logger = require('../../logger'),
    formidable = require('formidable'),
    Reading = require('../../models/db/reading'),
    Sensor = require('../../models/db/sensor'),
    REST = require('../../models/api/rest'),
    tokenHandler = require('../../models/api/tokenHandler');

var ROUTE = 'readings';
var LOG_TAG = {tag: ROUTE};

/**
 * @api {post} /api/readings Submit a Reading.
 * @apiName PostReading
 * @apiGroup Readings
 * @apiPermission admin
 *
 * @apiExample Reading Schema
 * {
 *    "sensor_id": "57c257ee9f8d16fc037d7cc0",
 *    "value": "21",
 *    "timestamp": "Sat Aug 27 2016 23:08:40 GMT-0500 (Central Daylight Time)"
 * }
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Reading} response.data The saved reading.
 * @apiSuccess {String} response.data.timestamp The timestamp of the reading's creation.
 * @apiSuccess {String} response.data.sensor_id The ID of the sensor that generated the reading.
 * @apiSuccess {Number} response.data.value The measurement value of the reading.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Example Response
 * "response": {
 *      "message": "Reading registered successfully!",
 *      "data": {
 *          "__v": 0,
 *          "timestamp": "2016-08-28T04:08:40.000Z",
 *          "sensor_id": "57c257ee9f8d16fc037d7cc0",
 *          "value": 21,
 *          "_id": "57c263e6daedcf141264448b"
 *      },
 *      "code": "400",
 *      "route": "readings",
 *      "timestamp": "Sat Aug 27 2016 23:09:10 GMT-0500 (Central Daylight Time)"
 * }
 */
router.post('/', function(req, res) {
    tokenHandler.validJSONWebToken(req.session, function (valid) {
        if (valid) {
            var form = req.body;
            if (validReadingForm(form)) {
                var sensorID = form.sensor_id;
                validSensorID(sensorID, function(valid) {
                    if (valid) {
                        saveReading(form, function(reading) {
                            if (reading != null) {
                                updateSensorLastReading(sensorID, function(updated) {
                                        if (updated) {
                                            logger.info('Sending reading saved to MongoDB', LOG_TAG);
                                            res.json(REST.READING_SAVED(ROUTE, reading));
                                        } else {
                                            logger.log('warn', 'Sending invalid sensor error', LOG_TAG);
                                            res.json(REST.INVALID_SENSOR(ROUTE));
                                        }
                                });
                            } else {
                                logger.log('warn', 'Sending invalid reading error', LOG_TAG);
                                res.json(REST.INVALID_READING(ROUTE));
                            }
                        });
                    } else {
                        logger.log('warn', 'Sending invalid sensor error', LOG_TAG);
                        res.json(REST.INVALID_SENSOR(ROUTE))
                    }
                });
            } else {
                logger.log('warn', 'Sending invalid reading error', LOG_TAG);
                res.json(REST.INVALID_READING(ROUTE));
            }
        } else {
            logger.log('warn', 'Sending invalid token error', LOG_TAG);
            res.json(REST.INVALID_TOKEN(ROUTE));
        }
    });
});

/**
 * @api {get} /api/readings Request the Last Hundred Readings.
 * @apiName GetReadings
 * @apiGroup Readings
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Reading[]} response.data An array of up to the last hundred readings.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Example Response
 * "response": {
 *      "message": "Your request was processed successfully.",
 *      "data": [
 *          {
 *              "_id": "57c263e6daedcf141264448b",
 *              "timestamp": "2016-08-28T04:08:40.000Z",
 *              "sensor_id": "57c257ee9f8d16fc037d7cc0",
 *              "value": 21,
 *              "__v": 0
 *          }
 *      ],
 *      "code": "400",
 *      "route": "readings",
 *      "timestamp": "Sat Aug 27 2016 23:11:44 GMT-0500 (Central Daylight Time)"
 * }
 */
router.get('/', function(req, res) {
    getLastHundredReadings(function(readings) {
        logger.info('Sending the last hundred readings returned by MongoDB', LOG_TAG);
        res.json(REST.REQUEST_PROCESSED(ROUTE, readings || []));
    });
});

/**
 * @api {get} /api/readings/sensor/:id Request Readings By Sensor ID
 * @apiName GetReadingsBySensorID
 * @apiGroup Readings
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Reading[]} response.data An array of readings generated by the sensor with the given ID.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Example Response
 * "response": {
 *      "message": "Your request was processed successfully.",
 *      "data": [
 *          {
 *              "_id": "57c263e6daedcf141264448b",
 *              "timestamp": "2016-08-28T04:08:40.000Z",
 *              "sensor_id": "57c257ee9f8d16fc037d7cc0",
 *              "value": 21,
 *              "__v": 0
 *          }
 *      ],
 *      "code": "400",
 *      "route": "readings",
 *      "timestamp": "Sat Aug 27 2016 23:14:08 GMT-0500 (Central Daylight Time)"
 * }
 */
router.get('/sensor/:id', function(req, res) {
    var sensorID = req.params.id;
    getReadingsFromSensor(sensorID, function(readings) {
        if (readings != null) {
            logger.info('Sending the readings returned by MongoDB', LOG_TAG);
            res.json(REST.REQUEST_PROCESSED(ROUTE, readings));
        } else {
            logger.log('warn', 'Sending reading does not exist error', LOG_TAG);
            res.json(REST.READING_DOES_NOT_EXIST(ROUTE));
        }
    });
});

/**
 * @api {get} /api/readings/sensor:id/count Request the Count of Readings By Sensor ID
 * @apiName GetCountOfReadingsBySensorID
 * @apiGroup Readings
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Number} response.data The count of readings generated by the sensor with the given ID.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Example Response
 * "response": {
 *      "message": "Your request was processed successfully.",
 *      "data": 1,
 *      "code": "400",
 *      "route": "readings",
 *      "timestamp": "Sat Aug 27 2016 23:16:24 GMT-0500 (Central Daylight Time)"
 * }
 */
router.get('/sensor/:id/count', function(req, res) {
    var sensorID = req.params.id;
    countReadingsFromSensor(sensorID, function(count) {
        if (count != null) {
            logger.info('Sending the count of readings by the given sensor returned by MongoDB', LOG_TAG);
            res.json(REST.REQUEST_PROCESSED(ROUTE, count));
        } else {
            logger.log('warn', 'Sending sensor does not exist error', LOG_TAG);
            res.json(REST.SENSOR_DOES_NOT_EXIST(ROUTE));
        }
    });
});

/**
 * @api {get} /api/readings/reading/:id Request Reading By ID
 * @apiName GetReadingByID
 * @apiGroup Readings
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Reading} response.data A reading with the given ID.
 * @apiSuccess {String} response.data.timestamp The timestamp of the reading's creation.
 * @apiSuccess {String} response.data.sensor_id The ID of the sensor that generated the reading.
 * @apiSuccess {Number} response.data.value The measurement value of the reading.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Example Response
 * "response": {
 *   "message": "Your request was processed successfully.",
 *   "data": [
 *     {
 *       "_id": "57c263e6daedcf141264448b",
 *       "timestamp": "2016-08-28T04:08:40.000Z",
 *       "sensor_id": "57c257ee9f8d16fc037d7cc0",
 *       "value": 21,
 *       "__v": 0
 *     }
 *   ],
 *   "code": "400",
 *   "route": "readings",
 *   "timestamp": "Sat Aug 27 2016 23:18:23 GMT-0500 (Central Daylight Time)"
 * }
 */
router.get('/reading/:id', function(req, res) {
    if (req.params.id != null) {
        var readingID = req.params.id;
        getReadingByID(readingID, function(reading) {
            if (reading != null) {
                logger.info('Sending the reading returned by MongoDB', LOG_TAG);
                res.json(REST.REQUEST_PROCESSED(ROUTE, reading));
            } else {
                logger.log('warn', 'Sending reading does not exist error', LOG_TAG);
                res.json(REST.READING_DOES_NOT_EXIST(ROUTE));
            }
        });
    } else {
        logger.log('warn', 'Sending internal error', LOG_TAG);
        res.json(REST.INTERNAL_ERROR(ROUTE));
    }
});

/**
 * @api {put} /api/readings/reading/:id Update Reading By ID
 * @apiName UpdateReadingByID
 * @apiGroup Readings
 * @apiPermission admin
 *
 * @apiExample Update Reading Schema
 * {
 *   "sensor_id": "57c257ee9f8d16fc037d7cc0",
 *   "value": "500",
 *   "timestamp": "Sat Aug 27 2016 23:08:40 GMT-0500 (Central Daylight Time)"
 * }
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Reading} response.data The updated reading.
 * @apiSuccess {String} response.data.timestamp The timestamp of the reading's creation.
 * @apiSuccess {String} response.data.sensor_id The ID of the sensor that generated the reading.
 * @apiSuccess {Number} response.data.value The measurement value of the reading.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Example Response
 * "response": {
 *      "message": "Reading updated successfully.",
 *      "data": {
 *          "_id": "57c263e6daedcf141264448b",
 *          "timestamp": "2016-08-28T04:08:40.000Z",
 *          "sensor_id": "57c257ee9f8d16fc037d7cc0",
 *          "value": 500,
 *          "__v": 0
 *      },
 *      "code": "400",
 *      "route": "readings",
 *      "timestamp": "Sat Aug 27 2016 23:32:49 GMT-0500 (Central Daylight Time)"
 * }
 */
router.put('/reading/:id', function(req, res) {
    if (req.params.id != null) {
        var readingID = req.params.id;
        tokenHandler.validJSONWebToken(req.session, function(valid) {
            if (valid) {
                getReadingByID(readingID, function(reading) {
                    if (reading != null) {
                        var form = req.body;
                        getUpdatedReadingFields(form, function(updatedFields) {
                            updateReading(reading, updatedFields, function(updatedReading) {
                                if (updatedReading != null) {
                                    logger.info('Sending the reading updated in MongoDB', LOG_TAG);
                                    return res.json(REST.READING_UPDATED(ROUTE,updatedReading));
                                } else {
                                    logger.log('warn', 'Sending internal error', LOG_TAG);
                                    return res.json(REST.INTERNAL_ERROR(ROUTE));
                                }
                            });
                        });
                    } else {
                        logger.log('warn', 'Sending reading does not exist error', LOG_TAG);
                        res.json(REST.READING_DOES_NOT_EXIST(ROUTE));
                    }
                });
            } else {
                logger.log('warn', 'Sending invalid token error', LOG_TAG);
                res.json(REST.INVALID_TOKEN(ROUTE));
            }
        });
    } else {
        logger.log('warn', 'Sending invalid reading error', LOG_TAG);
        return res.json(REST.INVALID_READING(ROUTE));
    }
});

/**
 * @api {delete} /api/readings/reading/:id Delete Reading By ID
 * @apiName DeleteReadingByID
 * @apiGroup Readings
 * @apiPermission admin
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Reading} response.data The deleted reading.
 * @apiSuccess {String} response.data.timestamp The timestamp of the reading's creation.
 * @apiSuccess {String} response.data.sensor_id The ID of the sensor that generated the reading.
 * @apiSuccess {Number} response.data.value The measurement value of the reading.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Example Response
 * "response": {
 *      "message": "Reading removed successfully.",
 *      "data": {
 *          "_id": "57c263e6daedcf141264448b",
 *          "timestamp": "2016-08-28T04:08:40.000Z",
 *          "sensor_id": "57c257ee9f8d16fc037d7cc0",
 *          "value": 500,
 *          "__v": 0
 *      },
 *      "code": "400",
 *      "route": "readings",
 *      "timestamp": "Sat Aug 27 2016 23:36:38 GMT-0500 (Central Daylight Time)"
 * }
 */
router.delete('/reading/:id', function(req, res) {
    if (req.params.id != null) {
        var readingID = req.params.id;
        tokenHandler.validJSONWebToken(req.session, function(valid) {
            if (valid) {
                removeReading(readingID, function(reading) {
                    if (reading != null) {
                        logger.info('Sending the reading removed from MongoDB', LOG_TAG);
                        res.json(REST.READING_REMOVED(ROUTE, reading));
                    } else {
                        logger.log('warn', 'Sending reading does not exist error', LOG_TAG);
                        res.json(REST.READING_DOES_NOT_EXIST(ROUTE));
                    }
                });
            } else {
                logger.log('warn', 'Sending invalid token error', LOG_TAG);
                res.json(REST.INVALID_TOKEN(ROUTE));
            }
        });
    } else {
        logger.log('Sending invalid reading error', LOG_TAG);
        return res.json(REST.INVALID_READING(ROUTE));
    }
});

/**
 * @api {get} /api/readings/count Request Count of Readings
 * @apiName GetCountOfReadings
 * @apiGroup Readings
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Number} response.data The count of all readings stored.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Example Response
 * "response": {
 *   "message": "Your request was processed successfully.",
 *   "data": 0,
 *   "code": "400",
 *   "route": "readings",
 *   "timestamp": "Sat Aug 27 2016 23:40:31 GMT-0500 (Central Daylight Time)"
 * }
 */
router.get('/count', function(req, res) {
    countReadings(function(count) {
        logger.info('Sending the count of readings in MongoDB', LOG_TAG);
        res.json(REST.REQUEST_PROCESSED(ROUTE, count || 0));
    });
});

function validReadingForm(form) {
    logger.log('debug', 'Validating the reading form', LOG_TAG);
    return (form.timestamp != null) &&
        (form.sensor_id != null) &&
        (form.value != null);
}

function saveReading(form, callback) {
    logger.log('debug', 'Saving the reading', LOG_TAG);
    logger.log('debug', form, LOG_TAG);
    var reading = new Reading({
        "timestamp": form.timestamp,
        "sensor_id": form.sensor_id,
        "value": form.value
    });
    reading.save(function(err, reading) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', reading, LOG_TAG);
            callback(reading);
        }
    });
}

function validSensorID(sensorID, callback) {
    logger.log('debug', 'Validating sensorID', LOG_TAG);
    logger.log('debug', sensorID, LOG_TAG);
    Sensor.findOne({_id: sensorID}, function (err, sensor) {
        if (err) {
            logger.log('error', err, LOG_TAG);
        }
        var validSensorID = (sensor != null);
        callback(validSensorID);
    });
}

function updateSensorLastReading(sensorID, callback) {
    logger.log('debug', 'Updating the last reading property of the given sensor', LOG_TAG);
    logger.log('debug', sensorID);
    var query = {_id: sensorID};
    Sensor.findOneAndUpdate(query, {last_reading: new Date().toString()}, function(err, sensor) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            callback(false);
        }
        else {
            logger.log('debug', sensor, LOG_TAG);
            callback(sensor);
        }
    })
}

function getReadingByID(readingID, callback) {
    logger.log('debug', 'Searching MongoDB for a reading with the given ID', LOG_TAG);
    logger.log('debug', readingID);
    var query = Reading.findOne({_id: readingID});
    query.exec(function(err, reading) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', reading, LOG_TAG);
            callback(reading);
        }
    });
}

function getLastHundredReadings(callback) {
    logger.log('debug', 'Searching MongoDB for the last hundred readings', LOG_TAG);
    var query = Reading.find().sort({$natural: -1}).limit(100);
    query.exec(function(err, readings) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', readings, LOG_TAG);
            callback(readings);
        }
    });
}

function countReadings(callback) {
    logger.log('debug', 'Searching MongoDB for the count of all readings', LOG_TAG);
    Reading.count(function(err, count) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', count, LOG_TAG);
            callback(count);
        }
    });
}

function getReadingsFromSensor(sensorID, callback) {
    logger.log('debug', 'Searching MongoDB for all readings from the given sensor', LOG_TAG);
    logger.log('debug', sensorID);
    var query = Reading.find({sensor_id: sensorID}).sort({$natural: -1}).limit(100);
    query.exec(function(err, readings) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', readings, LOG_TAG);
            callback(readings);
        }
    });
}

function countReadingsFromSensor(sensorID, callback) {
    logger.log('debug', 'Searching MongoDB for the count of all readings from the given sensor', LOG_TAG);
    logger.log('debug', sensorID);
    var query = Reading.find({sensor_id: sensorID}).count();
    query.exec(function(err, count) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', count, LOG_TAG);
            callback(count);
        }
    });
}

function getUpdatedReadingFields(form, callback) {
    logger.log('debug', 'Parsing the updated reading fields', LOG_TAG);
    var updatedFields = {};
    updatedFields.sensor_id = form.sensor_id || undefined;
    updatedFields.value = form.value || undefined;
    updatedFields.timestamp = form.timestamp || undefined;
    logger.log('debug', updatedFields, LOG_TAG);
    callback(updatedFields);
}

function updateReading(reading, updatedFields, callback) {
    logger.log('debug', 'Updating the reading in MongoDB', LOG_TAG);
    logger.log('debug', reading, LOG_TAG);
    logger.log('debug', updatedFields, LOG_TAG);
    var updatedReading = bindUpdatedFields(reading, updatedFields);
    updatedReading.save(function(err, reading) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', reading, LOG_TAG);
            callback(reading);
        }
    });
}

function bindUpdatedFields(reading, updatedFields) {
    logger.log('debug', 'Binding the updated fields to the given reading', LOG_TAG);
    logger.log('debug', reading, LOG_TAG);
    logger.log('debug', updatedFields, LOG_TAG);
    Object.keys(updatedFields).forEach(function(key, index) {
        reading[key] = updatedFields[key];
    });
    logger.log('debug', reading, LOG_TAG);
    return reading;
}

function removeReading(readingID, callback) {
    logger.log('debug', 'Removing the given reading from MongoDB', LOG_TAG);
    Reading.findByIdAndRemove(readingID, function(err, reading) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', reading, LOG_TAG);
            callback(reading);
        }
    });
}

module.exports = router;
