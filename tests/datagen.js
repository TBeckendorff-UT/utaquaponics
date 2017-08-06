var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

var logger = require('../logger.js');

var mongoose = require("mongoose");

var User = require("../models/db/user.js");
var Sensor = require('../models/db/sensor.js');
var Reading = require('../models/db/reading.js');
var Image = require('../models/db/image.js');

chai.use(chaiHttp);

logger.log('debug', '[DEVELOPMENT] Generating Dummy Data');

var username = "administrator";
var password = "password";

var agent = chai.request.agent(server);
var readingInterval = 1000;
var numReadingsPerSensor = 4;

describe('initialize authentication', function() {
    before(function() {
        User.remove({}, function(err) {});
        Sensor.remove({}, function(err) {});
        Reading.remove({}, function(err) {});
    });
    it('should register a new user', function (done) {
        agent
            .post('/api/register')
            .send({
                "username": username,
                "password": password,
                "registration_key": process.env.REGISTRATION_KEY
            })
            .end(function (err, res) {
                if (err) {
                    logger.log('debug', '[DEVELOPMENT] ' + err);
                } else {
                    logger.log('debug', '[DEVELOPMENT] ' + JSON.stringify(res.body));
                }
                done();
            });
    });
    it('should login to recieve a valid JSON Web Token', function (done) {
        agent
            .post('/api/login')
            .send({
                "username": username,
                "password": password
            })
            .end(function (err, res) {
                if (err) {
                    logger.log('debug', '[DEVELOPMENT] ' + err);
                } else {
                    logger.log('debug', '[DEVELOPMENT] ' + JSON.stringify(res.body));
                }
                done();
            });
    });
});

var sensors = [];

describe('generate sensors', function() {
    it('should register a new temperature sensor for floating raft', function(done) {
        agent
            .post('/api/sensors')
            .send({
                "sensor_name": "floating_raft_temperature",
                "reading_measurement": "Temperature",
                "reading_units": "°C",
                "serial_number": "777-777-777",
                "description": "The Floating Raft System's Temperature Sensor.",
                "plot_title": "Floating Raft Temperature",
                "plot_color": "green"
            })
            .end(function(err, res) {
                sensors.push(res.body.response.data);
                if (err) {
                    logger.log('debug', '[DEVELOPMENT] ' + err);
                } else {
                    logger.log('debug', '[DEVELOPMENT] ' + JSON.stringify(res.body));
                }
                done();
            });
    });
    it('should register a new temperature sensor for media bed', function(done) {
        agent
            .post('/api/sensors')
            .send({
                "sensor_name": "media_bed_temperature",
                "reading_measurement": "Temperature",
                "reading_units": "°C",
                "serial_number": "888",
                "description": "The Media Bed System's Temperature Sensor.",
                "plot_title": "Media Bed Temperature",
                "plot_color": "navy"
            })
            .end(function(err, res) {
                sensors.push(res.body.response.data);
                if (err) {
                    logger.log('debug', '[DEVELOPMENT] ' + err);
                } else {
                    logger.log('debug', '[DEVELOPMENT] ' + JSON.stringify(res.body));
                }
                done();
            });
    });
    it('should register a new pH sensor for floating raft', function(done) {
        agent
            .post('/api/sensors')
            .send({
                "sensor_name": "floating_raft_pH",
                "reading_measurement": "pH",
                "reading_units": " ",
                "serial_number": "999",
                "description": "The Floating Raft System's pH Sensor.",
                "plot_title": "Media Bed pH",
                "plot_color": "gold"
            })
            .end(function(err, res) {
                sensors.push(res.body.response.data);
                if (err) {
                    logger.log('debug', '[DEVELOPMENT] ' + err);
                } else {
                    logger.log('debug', '[DEVELOPMENT] ' + JSON.stringify(res.body));
                }
                done();
            });
    });
    it('should register a new pH sensor for media bed', function(done) {
        agent
            .post('/api/sensors')
            .send({
                "sensor_name": "media_bed_pH",
                "reading_measurement": "pH",
                "reading_units": " ",
                "serial_number": "1",
                "description": "The Media Bed System's pH Sensor.",
                "plot_title": "Media Bed pH",
                "plot_color": "maroon"
            })
            .end(function(err, res) {
                sensors.push(res.body.response.data);
                if (err) {
                    logger.log('debug', '[DEVELOPMENT] ' + err);
                } else {
                    logger.log('debug', '[DEVELOPMENT] ' + JSON.stringify(res.body));
                }
                done();
            });
    });
    it('should register a new Nitrate sensor for floating raft', function(done) {
        agent
            .post('/api/sensors')
            .send({
                "sensor_name": "floating_raft_nitrate",
                "reading_measurement": "Nitrate Concentration",
                "reading_units": "ppm",
                "serial_number": "2",
                "description": "The Floating Raft's Nitrate Concentration Sensor.",
                "plot_title": "Floating Raft Nitrate Concentration",
                "plot_color": "orange"
            })
            .end(function(err, res) {
                sensors.push(res.body.response.data);
                if (err) {
                    logger.log('debug', '[DEVELOPMENT] ' + err);
                } else {
                    logger.log('debug', '[DEVELOPMENT] ' + JSON.stringify(res.body));
                }
                done();
            });
    });
    it('should register a new Nitrate sensor for media bed', function(done) {
        agent
            .post('/api/sensors')
            .send({
                "sensor_name": "media_bed_nitrate",
                "reading_measurement": "Nitrate Concentration",
                "reading_units": "ppm",
                "serial_number": "3",
                "description": "The Media Bed's Nitrate Concentration Sensor.",
                "plot_title": "Media Bed Nitrate Concentration",
                "plot_color": "yellow"
            })
            .end(function(err, res) {
                sensors.push(res.body.response.data);
                if (err) {
                    logger.log('debug', '[DEVELOPMENT] ' + err);
                } else {
                    logger.log('debug', '[DEVELOPMENT] ' + JSON.stringify(res.body));
                }
                done();
            });
    });
});

describe('generate readings', function() {
    this.timeout(400000);
    it('should generate temperature readings for floating raft', function(done) {
        var minimum_value = 30;
        var maximum_value = 30.1;
        function request() {
            agent
                .post('/api/readings')
                .send({
                    "timestamp": new Date().toString(),
                    "sensor_id": sensors[0]._id,
                    "value": Math.random() * (maximum_value - minimum_value) + minimum_value
                })
                .end(function(err, res) {
                    if (err) {
                        logger.log('debug', '[DEVELOPMENT] ' + err);
                    } else {
                        logger.log('debug', '[DEVELOPMENT] ' + JSON.stringify(res.body));
                    }
                });
        }
        function generate(counter){
            if(counter < numReadingsPerSensor){
                setTimeout(function(){
                    counter++;
                    console.log(counter);
                    request();
                    generate(counter);
                }, readingInterval);
            } else {
                done();
            }
        }
        generate(0);
    });
    it('should generate temperature readings for media bed', function(done) {
        var minimum_value = 30;
        var maximum_value = 30.1;
        function request() {
            agent
                .post('/api/readings')
                .send({
                    "timestamp": new Date().toString(),
                    "sensor_id": sensors[1]._id,
                    "value": Math.random() * (maximum_value - minimum_value) + minimum_value
                })
                .end(function(err, res) {
                    if (err) {
                        logger.log('debug', '[DEVELOPMENT] ' + err);
                    } else {
                        logger.log('debug', '[DEVELOPMENT] ' + JSON.stringify(res.body));
                    }
                });
        }
        function generate(counter){
            if(counter < numReadingsPerSensor) {
                setTimeout(function(){
                    counter++;
                    console.log(counter);
                    request();
                    generate(counter);
                }, readingInterval);
            } else {
                done();
            }
        }
        generate(0);
    });
    it('should generate pH readings for floating raft', function(done) {
        var minimum_value = 5;
        var maximum_value = 5.2;
        function request() {
            agent
                .post('/api/readings')
                .send({
                    "timestamp": new Date().toString(),
                    "sensor_id": sensors[2]._id,
                    "value": Math.random() * (maximum_value - minimum_value) + minimum_value
                })
                .end(function(err, res) {
                    if (err) {
                        logger.log('debug', '[DEVELOPMENT] ' + err);
                    } else {
                        logger.log('debug', '[DEVELOPMENT] ' + JSON.stringify(res.body));
                    }
                });
        }
        function generate(counter){
            if(counter < numReadingsPerSensor){
                setTimeout(function(){
                    counter++;
                    console.log(counter);
                    request();
                    generate(counter);
                }, readingInterval);
            } else {
                done();
            }
        }
        generate(0);
    });
    it('should generate pH readings for media bed', function(done) {
        var minimum_value = 5;
        var maximum_value = 5.1;
        function request() {
            agent
                .post('/api/readings')
                .send({
                    "timestamp": new Date().toString(),
                    "sensor_id": sensors[3]._id,
                    "value": Math.random() * (maximum_value - minimum_value) + minimum_value
                })
                .end(function(err, res) {
                    if (err) {
                        logger.log('debug', '[DEVELOPMENT] ' + err);
                    } else {
                        logger.log('debug', '[DEVELOPMENT] ' + JSON.stringify(res.body));
                    }
                });
        }
        function generate(counter){
            if(counter < numReadingsPerSensor){
                setTimeout(function(){
                    counter++;
                    console.log(counter);
                    request();
                    generate(counter);
                }, readingInterval);
            } else {
                done();
            }
        }
        generate(0);
    });
    it('should generate nitrate concentration readings for floating raft', function(done) {
        var minimum_value = 0.01;
        var maximum_value = 0.03;
        function request() {
            agent
                .post('/api/readings')
                .send({
                    "timestamp": new Date().toString(),
                    "sensor_id": sensors[4]._id,
                    "value": Math.random() * (maximum_value - minimum_value) + minimum_value
                })
                .end(function(err, res) {
                    if (err) {
                        logger.log('debug', '[DEVELOPMENT] ' + err);
                    } else {
                        logger.log('debug', '[DEVELOPMENT] ' + JSON.stringify(res.body));
                    }
                });
        }
        function generate(counter){
            if(counter < numReadingsPerSensor){
                setTimeout(function(){
                    counter++;
                    console.log(counter);
                    request();
                    generate(counter);
                }, readingInterval);
            } else {
                done();
            }
        }
        generate(0);
    });
    it('should generate nitrate concentration readings for media bed', function(done) {
        var minimum_value = 0.1;
        var maximum_value = 0.12;
        function request() {
            agent
                .post('/api/readings')
                .send({
                    "timestamp": new Date().toString(),
                    "sensor_id": sensors[5]._id,
                    "value": Math.random() * (maximum_value - minimum_value) + minimum_value
                })
                .end(function(err, res) {
                    if (err) {
                        logger.log('debug', '[DEVELOPMENT] ' + err);
                    } else {
                        logger.log('debug', '[DEVELOPMENT] ' + JSON.stringify(res.body));
                    }
                });
        }
        function generate(counter){
            if(counter < numReadingsPerSensor){
                setTimeout(function(){
                    counter++;
                    console.log(counter);
                    request();
                    generate(counter);
                }, readingInterval);
            } else {
                done();
            }
        }
        generate(0);
    });
});