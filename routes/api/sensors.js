var express = require('express'),
    router = express.Router(),
    logger = require('../../logger'),
    REST = require('../../models/api/rest'),
    tokenHandler = require('../../models/api/tokenHandler'),
    formidable = require('formidable'),
    Sensor = require('../../models/db/sensor');

var ROUTE = 'sensors';
var LOG_TAG = {tag: ROUTE};

/**
 * @api {post} /api/sensors Submit a Sensor.
 * @apiName PostSensors
 * @apiGroup Sensors
 * @apiPermission admin
 *
 * @apiExample Sensor Schema
 * {
 *      "sensor_name": "floating_raft_temperature",
 *      "reading_measurement": "Temperature",
 *      "reading_units": "°C",
 *      "serial_number": "777-777-7777",
 *      "description": "The Floating Raft System's Temperature Sensor.",
 *      "title": "Floating Raft Temperature"
 * }
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Sensor} response.data The saved sensor.
 * @apiSuccess {String} response.data.sensor_name The name of the sensor.
 * @apiSuccess {String} response.data.reading_measurement The type of measurement the sensor makes.
 * @apiSuccess {String} response.data.reading_units The measurement units the sensor's readings are reported in.
 * @apiSuccess {String} response.data.serial_number The serial number of the sensor.
 * @apiSuccess {String} response.data.description A brief description of the sensor.
 * @apiSuccess {String} response.data.title The title to be used for the sensor's data plot.
 * @apiSuccess {String} response.data.last_reading A timestamp of the last reading time.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Response Example
 * "response": {
 *      "message": "Sensor registered successfully!",
 *      "data": {
 *           "__v": 0,
 *           "sensor_name": "floating_raft_temperature",
 *           "reading_measurement": "Temperature",
 *           "reading_units": "°C",
 *           "serial_number": "777-777-7777",
 *           "description": "The Floating Raft System's Temperature Sensor.",
 *           "title": "Floating Raft Temperature",
 *           "last_reading": "2016-08-28T03:18:06.000Z",
 *           "_id": "57c257ee9f8d16fc037d7cc0"
 *      },
 *      "code": "400",
 *      "route": "sensors",
 *      "timestamp": "Sat Aug 27 2016 22:18:06 GMT-0500 (Central Daylight Time)"
 * }
 */
router.post('/', function(req, res) {
    tokenHandler.validJSONWebToken(req.session, function(valid) {
        if (valid) {
            var form = req.body;
            if (validSensorForm(form)) {
                logger.log('debug', form, LOG_TAG);
                isUniqueSensor(form, function(unique) {
                    if (unique) {
                        saveSensor(form, function(sensor) {
                            if (sensor != null) {
                                logger.info('Sending the sensor saved in MongoDB', LOG_TAG);
                                res.json(REST.SENSOR_SAVED(ROUTE, sensor));
                            } else {
                                logger.log('warn', 'Sending an invalid sensor error', LOG_TAG);
                                res.json(REST.INVALID_SENSOR(ROUTE));
                            }
                        });
                    } else {
                        logger.log('warn', 'Sending an invalid sensor error', LOG_TAG);
                        res.json(REST.INVALID_SENSOR(ROUTE));
                    }
                });
            } else {
                logger.log('warn', 'Sending an invalid sensor error', LOG_TAG);
                res.json(REST.INVALID_SENSOR(ROUTE));
            }
        } else {
            logger.log('warn', 'Sending an invalid token error', LOG_TAG);
            res.json(REST.INVALID_TOKEN(ROUTE));
        }
    });
});

/**
 * @api {get} /api/sensors Request All Sensors.
 * @apiName GetSensors
 * @apiGroup Sensors
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Sensor[]} response.data An array of the sensors stored.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Example Response
 * "response": {
 *      "message": "Your request was processed successfully.",
 *      "data": [
 *          {
 *              "_id": "57c257ee9f8d16fc037d7cc0",
 *              "sensor_name": "floating_raft_temperature",
 *              "reading_measurement": "Temperature",
 *              "reading_units": "°C",
 *              "serial_number": "777-777-777",
 *              "description": "The Floating Raft System's Temperature Sensor.",
 *              "title": "****************",
 *              "last_reading": "2016-08-28T03:18:06.000Z",
 *              "__v": 0
 *          }
 *      ],
 *      "code": "400",
 *      "route": "sensors",
 *      "timestamp": "Sat Aug 27 2016 22:46:34 GMT-0500 (Central Daylight Time)"
 * }
 */
router.get('/', function(req, res) {
    getSensors(function(sensors) {
        logger.info('Sending the sensors found in MongoDB', LOG_TAG);
        res.json(REST.REQUEST_PROCESSED(ROUTE, sensors || []));
    });
});

/**
 * @api {get} /api/sensors/count Request the Count of Sensors
 * @apiName GetCountOfSensors
 * @apiGroup Sensors
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Number} response.data The count of all sensors stored.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Example Response
 * "response": {
 *      "message": "Your request was processed successfully.",
 *      "data": 1,
 *      "code": "400",
 *      "route": "sensors",
 *      "timestamp": "Sat Aug 27 2016 22:49:56 GMT-0500 (Central Daylight Time)"
 * }
 */
router.get('/count', function(req, res) {
    countSensors(function(count) {
        logger.info('Sending the count of sensors in MongoDB', LOG_TAG);
        res.json(REST.REQUEST_PROCESSED(ROUTE, count || 0));
    });
});

/**
 * @api {get} /api/sensors/name/:sensor_name Request a Sensor By Name
 * @apiName GetSensorByName
 * @apiGroup Sensors
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Sensor} response.data A sensor that has the name provided.
 * @apiSuccess {String} response.data.sensor_name The name of the sensor.
 * @apiSuccess {String} response.data.reading_measurement The type of measurement the sensor makes.
 * @apiSuccess {String} response.data.reading_units The measurement units the sensor's readings are reported in.
 * @apiSuccess {String} response.data.serial_number The serial number of the sensor.
 * @apiSuccess {String} response.data.description A brief description of the sensor.
 * @apiSuccess {String} response.data.title The title to be used for the sensor's data plot.
 * @apiSuccess {String} response.data.last_reading A timestamp of the last reading time.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Example Response
 * "response": {
 *      "message": "Your request was processed successfully.",
 *      "data": {
 *          "_id": "57c257ee9f8d16fc037d7cc0",
 *          "sensor_name": "floating_raft_temperature",
 *          "reading_measurement": "Temperature",
 *          "reading_units": "°C",
 *          "serial_number": "777-777-777",
 *          "description": "The Floating Raft System's Temperature Sensor.",
 *          "title": "Floating Raft Temperature",
 *          "last_reading": "2016-08-28T03:18:06.000Z",
 *          "__v": 0
 *      },
 *      "code": "400",
 *      "route": "sensors",
 *      "timestamp": "Sat Aug 27 2016 22:51:22 GMT-0500 (Central Daylight Time)"
 * }
 */
router.get('/name/:sensor_name', function(req, res) {
    if (req.params.sensor_name != null) {
        var sensorName = req.params.sensor_name;
        getSensorByName(sensorName, function(sensor) {
            if (sensor != null) {
                logger.info('Sending the sensor returned by MongoDB', LOG_TAG);
                res.json(REST.REQUEST_PROCESSED(ROUTE, sensor));
            } else {
                logger.log('warn', 'Sending sensor does not exist error', LOG_TAG);
                res.json(REST.SENSOR_DOES_NOT_EXIST(ROUTE));
            }
        });
    } else {
        logger.log('warn', 'Sending invalid sensor error', LOG_TAG);
        res.json(REST.INVALID_SENSOR(ROUTE));
    }
});

/**
 * @api {get} /api/sensors/serial-number/:serial_number Request a Sensor By Serial Number
 * @apiName GetSensorBySerialNumber
 * @apiGroup Sensors
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Sensor} response.data A sensor that has the serial number provided.
 * @apiSuccess {String} response.data.sensor_name The name of the sensor.
 * @apiSuccess {String} response.data.reading_measurement The type of measurement the sensor makes.
 * @apiSuccess {String} response.data.reading_units The measurement units the sensor's readings are reported in.
 * @apiSuccess {String} response.data.serial_number The serial number of the sensor.
 * @apiSuccess {String} response.data.description A brief description of the sensor.
 * @apiSuccess {String} response.data.title The title to be used for the sensor's data plot.
 * @apiSuccess {String} response.data.last_reading A timestamp of the last reading time.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Example Response
 * "response": {
 *      "message": "Your request was processed successfully.",
 *      "data": {
 *          "_id": "57c257ee9f8d16fc037d7cc0",
 *          "sensor_name": "floating_raft_temperature",
 *          "reading_measurement": "Temperature",
 *          "reading_units": "°C",
 *          "serial_number": "777-777-777",
 *          "description": "The Floating Raft System's Temperature Sensor.",
 *          "title": "Floating Raft Temperature",
 *          "last_reading": "2016-08-28T03:18:06.000Z",
 *          "__v": 0
 *      },
 *      "code": "400",
 *      "route": "sensors",
 *      "timestamp": "Sat Aug 27 2016 22:51:22 GMT-0500 (Central Daylight Time)"
 * }
 */
router.get('/serial-number/:serial_number', function(req, res) {
    if (req.params.serial_number != null) {
        var serialNumber = req.params.serial_number;
        getSensorBySerialNumber(serialNumber, function(sensor) {
            if (sensor != null) {
                logger.info('Sending the sensor returned by MongoDB', LOG_TAG);
                res.json(REST.REQUEST_PROCESSED(ROUTE, sensor));
            } else {
                logger.log('warn', 'Sending sensor does not exist error', LOG_TAG);
                res.json(REST.SENSOR_DOES_NOT_EXIST(ROUTE));
            }
        });
    } else {
        logger.log('warn', 'Sending invalid sensor error', LOG_TAG);
        res.json(REST.INVALID_SENSOR(ROUTE));
    }
});

/**
 * @api {get} /api/sensors/sensor/:id Request a Sensor By ID
 * @apiName GetSensorByID
 * @apiGroup Sensors
 * @apiPermission none
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Sensor} response.data The sensor with the ID provided.
 * @apiSuccess {String} response.data.sensor_name The name of the sensor.
 * @apiSuccess {String} response.data.reading_measurement The type of measurement the sensor makes.
 * @apiSuccess {String} response.data.reading_units The measurement units the sensor's readings are reported in.
 * @apiSuccess {String} response.data.serial_number The serial number of the sensor.
 * @apiSuccess {String} response.data.description A brief description of the sensor.
 * @apiSuccess {String} response.data.title The title to be used for the sensor's data plot.
 * @apiSuccess {String} response.data.last_reading A timestamp of the last reading time.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Example Response
 * "response": {
 *      "message": "Your request was processed successfully.",
 *      "data": {
 *          "_id": "57c257ee9f8d16fc037d7cc0",
 *          "sensor_name": "floating_raft_temperature",
 *          "reading_measurement": "Temperature",
 *          "reading_units": "°C",
 *          "serial_number": "777-777-777",
 *          "description": "The Floating Raft System's Temperature Sensor.",
 *          "title": "Floating Raft Temperature",
 *          "last_reading": "2016-08-28T03:18:06.000Z",
 *          "__v": 0
 *      },
 *      "code": "400",
 *      "route": "sensors",
 *      "timestamp": "Sat Aug 27 2016 22:51:22 GMT-0500 (Central Daylight Time)"
 * }
 */
router.get('/sensor/:id', function(req, res) {
    if (req.params.id != null) {
        var id = req.params.id;
        getSensorByID(id, function(sensor) {
            if (sensor != null) {
                logger.info('Sending the sensor returned by MongoDB', LOG_TAG);
                res.json(REST.REQUEST_PROCESSED(ROUTE, sensor));
            } else {
                logger.log('warn', 'Sending sensor does not exist error', LOG_TAG);
                res.json(REST.SENSOR_DOES_NOT_EXIST(ROUTE));
            }
        });
    } else {
        logger.log('warn', 'Sending invalid sensor error', LOG_TAG);
        res.json(REST.INVALID_SENSOR(ROUTE));
    }
});

/**
 * @api {put} /api/sensors/sensor/:id Update a Sensor
 * @apiName UpdateSensor
 * @apiGroup Sensors
 * @apiPermission admin
 *
 * @apiExample Update Sensor Schema
 * {
 *       "sensor_name": "floating_raft_temperature",
 *       "reading_measurement": "Temperature",
 *       "reading_units": "°C",
 *       "serial_number": "777-777-777",
 *       "description": "The Floating Raft System's Temperature Sensor.",
 *       "title": "****************"
 * }
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Sensor} response.data The updated sensor.
 * @apiSuccess {String} response.data.sensor_name The name of the sensor.
 * @apiSuccess {String} response.data.reading_measurement The type of measurement the sensor makes.
 * @apiSuccess {String} response.data.reading_units The measurement units the sensor's readings are reported in.
 * @apiSuccess {String} response.data.serial_number The serial number of the sensor.
 * @apiSuccess {String} response.data.description A brief description of the sensor.
 * @apiSuccess {String} response.data.title The title to be used for the sensor's data plot.
 * @apiSuccess {String} response.data.last_reading A timestamp of the last reading time.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Example Response
 * "response": {
 *      "message": "Sensor updated successfully.",
 *      "data": {
 *          "_id": "57c257ee9f8d16fc037d7cc0",
 *          "sensor_name": "floating_raft_temperature",
 *          "reading_measurement": "Temperature",
 *          "reading_units": "°C",
 *          "serial_number": "777-777-777",
 *          "description": "The Floating Raft System's Temperature Sensor.",
 *          "title": "****************",
 *          "last_reading": "2016-08-28T03:18:06.000Z",
 *          "__v": 0
 *      },
 *      "code": "400",
 *      "route": "sensors",
 *      "timestamp": "Sat Aug 27 2016 22:42:17 GMT-0500 (Central Daylight Time)"
 * }
 */
router.put('/sensor/:id', function(req, res) {
    if (req.params.id != null) {
        var sensorID = req.params.id;
        tokenHandler.validJSONWebToken(req.session, function(valid) {
            if (valid) {
                getSensorByID(sensorID, function (sensor) {
                    if (sensor != null) {
                        var form = req.body;
                        getUpdatedSensorFields(form, function(updatedFields) {
                            updateSensor(sensor, updatedFields, function (updatedSensor) {
                                if (updatedSensor != null) {
                                    logger.info('Sending the sensor updated in MongoDB', LOG_TAG);
                                    return res.json(REST.SENSOR_UPDATED(ROUTE, updatedSensor));
                                } else {
                                    logger.log('warn', 'Sending invalid sensor error', LOG_TAG);
                                    return res.json(REST.INVALID_SENSOR(ROUTE));
                                }
                            });
                        });
                    } else {
                        logger.log('warn', 'Sending sensor does not exist error', LOG_TAG);
                        res.json(REST.SENSOR_DOES_NOT_EXIST(ROUTE));
                    }
                });
            } else {
                logger.log('warn', 'Sending invalid token error', LOG_TAG);
                res.json(REST.INVALID_TOKEN(ROUTE));
            }
        });
    } else {
        logger.log('warn', 'Sending invalid sensor error', LOG_TAG);
        return res.json(REST.INVALID_SENSOR(ROUTE));
    }
});

/**
 * @api {delete} /api/sensors/sensor/:id Delete a Sensor
 * @apiName DeleteSensor
 * @apiGroup Sensors
 * @apiPermission admin
 *
 * @apiSuccess {Object} response Response Information
 * @apiSuccess {String} response.message Response Message
 * @apiSuccess {Sensor} response.data The sensor deleted.
 * @apiSuccess {String} response.data.sensor_name The name of the sensor.
 * @apiSuccess {String} response.data.reading_measurement The type of measurement the sensor makes.
 * @apiSuccess {String} response.data.reading_units The measurement units the sensor's readings are reported in.
 * @apiSuccess {String} response.data.serial_number The serial number of the sensor.
 * @apiSuccess {String} response.data.description A brief description of the sensor.
 * @apiSuccess {String} response.data.title The title to be used for the sensor's data plot.
 * @apiSuccess {String} response.data.last_reading A timestamp of the last reading time.
 * @apiSuccess {String} response.code Response Code
 * @apiSuccess {Date} response.timestamp Response Timestamp
 *
 * @apiSuccessExample Example Response
 * "response": {
 *   "message": "Sensor removed successfully.",
 *   "data": {
 *     "_id": "57c257ee9f8d16fc037d7cc0",
 *     "sensor_name": "floating_raft_temperature",
 *     "reading_measurement": "Temperature",
 *     "reading_units": "°C",
 *     "serial_number": "777-777-777",
 *     "description": "The Floating Raft System's Temperature Sensor.",
 *     "title": "****************",
 *     "last_reading": "2016-08-28T04:09:10.000Z",
 *     "__v": 0
 *   },
 *   "code": "400",
 *   "route": "sensors",
 *   "timestamp": "Sat Aug 27 2016 23:43:47 GMT-0500 (Central Daylight Time)"
 * }
 */
router.delete('/sensor/:id', function(req, res) {
    if (req.params.id != null) {
        var sensorID = req.params.id;
        tokenHandler.validJSONWebToken(req.session, function(valid){
            if (valid) {
                removeSensor(sensorID, function (sensor) {
                    if (sensor != null) {
                        logger.info('Sending the sensor removed from MongoDB', LOG_TAG);
                        res.json(REST.SENSOR_REMOVED(ROUTE, sensor));
                    } else {
                        logger.log('warn', 'Sending sensor does not exist error', LOG_TAG);
                        res.json(REST.SENSOR_DOES_NOT_EXIST(ROUTE));
                    }
                });
            } else {
                logger.log('warn', 'Sending invalid token error', LOG_TAG);
                res.json(REST.INVALID_TOKEN(ROUTE));
            }
        });
    } else {
        logger.log('warn', 'Sending invalid image error', LOG_TAG);
        return res.json(REST.INVALID_IMAGE(ROUTE));
    }
});

function validSensorForm(form) {
    logger.log('debug', 'Validating the sensor form', LOG_TAG);
    var valid = (form.sensor_name != null) &&
        (form.reading_measurement != null) &&
        (form.reading_units != null) &&
        (form.serial_number != null) &&
        (form.description != null) &&
        (form.title != null);
    if (valid) {
        logger.log('debug', 'Validated the sensor form', LOG_TAG);
    } else {
        logger.log('debug', 'Validation failed for the sensor form', LOG_TAG);
    }
    return valid;
}

function saveSensor(form, callback) {
    logger.log('debug', 'Saving the given sensor', LOG_TAG);
    var sensor = new Sensor({
        "sensor_name": form.sensor_name,
        "reading_measurement": form.reading_measurement,
        "reading_units": form.reading_units,
        "serial_number": form.serial_number,
        "description": form.description,
        "title": form.title,
        "last_reading": new Date().toString()
    });
    sensor.save(function(err, sensor) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            logger.log('debug', 'The given sensor could not be saved', LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', sensor, LOG_TAG);
            logger.log('debug', 'The given sensor was saved successfully', LOG_TAG);
            callback(sensor);
        }
    });
}

function getSensors(callback) {
    logger.log('debug', 'Getting all the sensors', LOG_TAG);
    Sensor.find({}, function(err, sensors) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            logger.log('debug', 'Unable to retrieve all of the sensors', LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', 'Successfully retrieved all sensors', LOG_TAG);
            logger.log('debug', sensors, LOG_TAG);
            callback(sensors);
        }
    });
}

function countSensors(callback) {
    logger.log('debug', 'Counting the sensors in MongoDB', LOG_TAG);
    Sensor.count(function(err, count) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            logger.log('debug', 'Unable to count the sensors', LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', 'Successfully counted the sensors', LOG_TAG);
            logger.log('debug', count, LOG_TAG);
            callback(count);
        }
    });
}

function getSensorByName(name, callback) {
    logger.log('debug', 'Searching MongoDB for a sensor with the given name', LOG_TAG);
    Sensor.findOne({sensor_name: name}, function (err, sensor) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            logger.log('debug', 'Unable to find the sensor with the given name', LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', 'Found the sensor with the given name', LOG_TAG);
            logger.log('debug', sensor, LOG_TAG);
            callback(sensor);
        }
    });
}

function getSensorBySerialNumber(serialNumber, callback) {
    logger.log('debug', 'Searching MongoDB for a sensor with the given serial number', LOG_TAG);
    Sensor.findOne({serial_number: serialNumber}, function (err, sensor) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            logger.log('debug', 'Unable to find a sensor with the given serial number', LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', 'Found sensor with the given serial number', LOG_TAG);
            logger.log('debug', sensor, LOG_TAG);
            callback(sensor);
        }
    });
}

function getSensorByID(ID, callback) {
    logger.log('debug', 'Searching MongoDB for a sensor with the given ID', LOG_TAG);
    Sensor.findOne({_id: ID}, function (err, sensor) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            logger.log('debug', 'Unable to find the sensor with the given ID', LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', 'Found the sensor with the given ID', LOG_TAG);
            logger.log('debug', sensor, LOG_TAG);
            callback(sensor);
        }
    });
}

function removeSensor(sensorID, callback) {
    logger.log('debug', 'Removing the sensor from MongoDB with the given ID', LOG_TAG);
    Sensor.findByIdAndRemove(sensorID, function(err, sensor) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            logger.log('debug', 'Unable to remove the given sensor', LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', 'Removed the given sensor', LOG_TAG);
            logger.log('debug', sensor, LOG_TAG);
            callback(sensor);
        }
    });
}

function getUpdatedSensorFields(form, callback) {
    logger.log('debug', 'Parsing the updated sensor fields', LOG_TAG);
    var updatedFields = {};
    updatedFields.sensor_name = form.sensor_name || undefined;
    updatedFields.reading_measurement = form.reading_measurement || undefined;
    updatedFields.reading_units = form.reading_units || undefined;
    updatedFields.serial_number = form.serial_number || undefined;
    updatedFields.description = form.description || undefined;
    updatedFields.title = form.title || undefined;
    logger.log('debug', updatedFields, LOG_TAG);
    callback(updatedFields);
}

function bindUpdatedFields(sensor, updatedFields) {
    logger.log('debug', 'Binding the updated fields to the given sensor', LOG_TAG);
    logger.log('debug', sensor, LOG_TAG);
    logger.log('debug', updatedFields, LOG_TAG);
    Object.keys(updatedFields).forEach(function(key, index) {
        sensor[key] = updatedFields[key];
    });
    logger.log('debug', sensor, LOG_TAG);
    return sensor;
}

function updateSensor(sensor, updatedFields, callback) {
    logger.log('debug', 'Updating the sensor in MongoDB', LOG_TAG);
    logger.log('debug', sensor, LOG_TAG);
    logger.log('debug', updatedFields, LOG_TAG);
    var updatedSensor = bindUpdatedFields(sensor, updatedFields);
    updatedSensor.save(function(err, sensor) {
        if (err) {
            logger.log('error', err, LOG_TAG);
            logger.log('debug', 'Unable to update the given sensor', LOG_TAG);
            callback(null);
        }
        else {
            logger.log('debug', 'Updated the given sensor', LOG_TAG);
            logger.log('debug', sensor, LOG_TAG);
            callback(sensor);
        }
    });
}

function isUniqueSensor(form, callback) {
    logger.log('debug', 'Checking to see if sensor provided is unique', LOG_TAG);
    getSensorByName(form.sensor_name, function(sensor) {
        console.log("Sensor: " + sensor);
        var isUniqueSensor = (sensor === null);
        logger.log('debug', isUniqueSensor, LOG_TAG);
        if (isUniqueSensor) {
            logger.log('debug', 'The given sensor is unique', LOG_TAG);
        } else {
            logger.log('debug', 'The given sensor is not unique', LOG_TAG);
        }
        callback(isUniqueSensor);
    });

}

module.exports = router;