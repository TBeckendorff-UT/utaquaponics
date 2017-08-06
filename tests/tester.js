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

var Constants = require('../models/api/constants.js');

chai.use(chaiHttp);

logger.log('debug', '[TEST] Initiating Tests');

describe('/api/register', function() {
    before(function() {
        User.remove({}, function(err) {});
        Image.remove({}, function(err) {});
        Sensor.remove({}, function(err) {});
        Reading.remove({}, function(err) {});
    });
    it('should register a new user on POST /register', function(done) {
        chai.request(server)
            .post('/api/register')
            .send({
                "username": "administrator",
                "password": "password",
                "registration_key": process.env.REGISTRATION_KEY
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('object');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_USER_REGISTERED);
                res.body.response.code.should.equal(Constants.CODE_USER_REGISTERED);
                res.body.response.route.should.equal("register");
                res.body.response.data.should.have.property('username');
                res.body.response.data.should.not.have.property('password');
                res.body.response.data.should.have.property('_id');
                res.body.response.data.username.should.equal('administrator');
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            })
    });
    it('should not register an existing user on POST /register', function(done) {
        chai.request(server)
            .post('/api/register')
            .send({
                "username": "administrator",
                "password": "password",
                "registration_key": process.env.REGISTRATION_KEY
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.a('object');
                res.body.error.should.have.property('message');
                res.body.error.should.not.have.property('data');
                res.body.error.should.have.property('description');
                res.body.error.should.have.property('code');
                res.body.error.should.have.property('route');
                res.body.error.should.have.property('timestamp');
                res.body.error.message.should.be.a('string');
                res.body.error.description.should.be.a('string');
                res.body.error.code.should.be.a('string');
                res.body.error.route.should.be.a('string');
                res.body.error.timestamp.should.be.a('string');
                res.body.error.message.should.equal(Constants.MESSAGE_USERNAME_TAKEN);
                res.body.error.description.should.equal(Constants.DESCRIPTION_USERNAME_TAKEN);
                res.body.error.code.should.equal(Constants.CODE_USERNAME_TAKEN);
                res.body.error.route.should.equal("register");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            })
    });
    it('should require a username on POST /register', function(done) {
        chai.request(server)
            .post('/api/register')
            .send({
                "password": "password"
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.a('object');
                res.body.error.should.have.property('message');
                res.body.error.should.not.have.property('data');
                res.body.error.should.have.property('description');
                res.body.error.should.have.property('code');
                res.body.error.should.have.property('route');
                res.body.error.should.have.property('timestamp');
                res.body.error.message.should.be.a('string');
                res.body.error.description.should.be.a('string');
                res.body.error.code.should.be.a('string');
                res.body.error.route.should.be.a('string');
                res.body.error.timestamp.should.be.a('string');
                res.body.error.message.should.equal(Constants.MESSAGE_INVALID_REGISTRATION_FORM);
                res.body.error.description.should.equal(Constants.DESCRIPTION_INVALID_REGISTRATION_FORM);
                res.body.error.code.should.equal(Constants.CODE_INVALID_REGISTRATION_FORM);
                res.body.error.route.should.equal("register");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            })
    });
    it('should require a password on POST /register', function(done) {
        chai.request(server)
            .post('/api/register')
            .send({
                "username":"administrator"
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.a('object');
                res.body.error.should.have.property('message');
                res.body.error.should.not.have.property('data');
                res.body.error.should.have.property('description');
                res.body.error.should.have.property('code');
                res.body.error.should.have.property('route');
                res.body.error.should.have.property('timestamp');
                res.body.error.message.should.be.a('string');
                res.body.error.description.should.be.a('string');
                res.body.error.code.should.be.a('string');
                res.body.error.route.should.be.a('string');
                res.body.error.timestamp.should.be.a('string');
                res.body.error.message.should.equal(Constants.MESSAGE_INVALID_REGISTRATION_FORM);
                res.body.error.description.should.equal(Constants.DESCRIPTION_INVALID_REGISTRATION_FORM);
                res.body.error.code.should.equal(Constants.CODE_INVALID_REGISTRATION_FORM);
                res.body.error.route.should.equal("register");
                logger.log('debug', '[TEST] ' + res);
                done();
            })
    });
    it('should not save additional fields on POST /register', function(done) {
        chai.request(server)
            .post('/api/register')
            .send({
                "username":"bob",
                "password":"dylan",
                "age":"49",
                "registration_key": process.env.REGISTRATION_KEY
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('object');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.data.should.have.property('username');
                res.body.response.data.should.not.have.property('password');
                res.body.response.data.should.have.property('_id');
                res.body.response.data.username.should.equal('bob');
                res.body.response.data.should.not.have.property('age');
                logger.log('debug', '[TEST] ' + res);
                done();
            })
    });
    it('should save username as lowercase on POST /register', function(done) {
        chai.request(server)
            .post('/api/register')
            .send({
                "username":"USERNAME",
                "password":"password",
                "registration_key": process.env.REGISTRATION_KEY
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('object');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_USER_REGISTERED);
                res.body.response.code.should.equal(Constants.CODE_USER_REGISTERED);
                res.body.response.route.should.equal("register");
                res.body.response.data.should.have.property('username');
                res.body.response.data.should.not.have.property('password');
                res.body.response.data.should.have.property('_id');
                res.body.response.data.username.should.equal('username');
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            })
    });
});

describe('/api/login', function() {
    it('should login a user', function(done) {
        chai.request.agent(server)
            .post('/api/login')
            .send({
                "username": "administrator",
                "password": "password"
            })
            .end(function(err, res){
                res.should.have.status(200);
                res.should.redirect;
                res.should.be.html;
                logger.log('debug', '[TEST] ' + res);
                done();
            });
    });
    it('should not login an invalid username', function(done) {
        chai.request.agent(server)
            .post('/api/login')
            .send({
                "username": "buffalo",
                "password": "password"
            })
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.a('object');
                res.body.error.should.have.property('message');
                res.body.error.should.have.property('description');
                res.body.error.should.have.property('code');
                res.body.error.should.have.property('route');
                res.body.error.should.have.property('timestamp');
                res.body.error.message.should.be.a('string');
                res.body.error.description.should.be.a('string');
                res.body.error.code.should.be.a('string');
                res.body.error.route.should.be.a('string');
                res.body.error.timestamp.should.be.a('string');
                res.body.error.message.should.equal(Constants.MESSAGE_AUTH_FAILED);
                res.body.error.description.should.equal(Constants.DESCRIPTION_AUTH_FAILED);
                res.body.error.code.should.equal(Constants.CODE_AUTH_FAILED);
                res.body.error.route.should.equal('login');
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should not login an invalid password', function(done) {
        chai.request.agent(server)
            .post('/api/login')
            .send({
                "username": "administrator",
                "password": "buffalo"
            })
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.a('object');
                res.body.error.should.have.property('message');
                res.body.error.should.have.property('description');
                res.body.error.should.have.property('code');
                res.body.error.should.have.property('route');
                res.body.error.should.have.property('timestamp');
                res.body.error.message.should.be.a('string');
                res.body.error.description.should.be.a('string');
                res.body.error.code.should.be.a('string');
                res.body.error.route.should.be.a('string');
                res.body.error.timestamp.should.be.a('string');
                res.body.error.message.should.equal(Constants.MESSAGE_AUTH_FAILED);
                res.body.error.description.should.equal(Constants.DESCRIPTION_AUTH_FAILED);
                res.body.error.code.should.equal(Constants.CODE_AUTH_FAILED);
                res.body.error.route.should.equal('login');
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should require a username', function(done) {
        chai.request.agent(server)
            .post('/api/login')
            .send({
                "password": "buffalo"
            })
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.a('object');
                res.body.error.should.have.property('message');
                res.body.error.should.have.property('description');
                res.body.error.should.have.property('code');
                res.body.error.should.have.property('route');
                res.body.error.should.have.property('timestamp');
                res.body.error.message.should.be.a('string');
                res.body.error.description.should.be.a('string');
                res.body.error.code.should.be.a('string');
                res.body.error.route.should.be.a('string');
                res.body.error.timestamp.should.be.a('string');
                res.body.error.message.should.equal(Constants.MESSAGE_INTERNAL_ERROR);
                res.body.error.description.should.equal(Constants.DESCRIPTION_INTERNAL_ERROR);
                res.body.error.code.should.equal(Constants.CODE_INTERNAL_ERROR);
                res.body.error.route.should.equal('login');
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should require a password', function(done) {
        chai.request.agent(server)
            .post('/api/login')
            .send({
                "username": "administrator"
            })
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.a('object');
                res.body.error.should.have.property('message');
                res.body.error.should.have.property('description');
                res.body.error.should.have.property('code');
                res.body.error.should.have.property('route');
                res.body.error.should.have.property('timestamp');
                res.body.error.message.should.be.a('string');
                res.body.error.description.should.be.a('string');
                res.body.error.code.should.be.a('string');
                res.body.error.route.should.be.a('string');
                res.body.error.timestamp.should.be.a('string');
                res.body.error.message.should.equal(Constants.MESSAGE_INTERNAL_ERROR);
                res.body.error.description.should.equal(Constants.DESCRIPTION_INTERNAL_ERROR);
                res.body.error.code.should.equal(Constants.CODE_INTERNAL_ERROR);
                res.body.error.route.should.equal('login');
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should accept uppercase username', function(done) {
        chai.request.agent(server)
            .post('/api/login')
            .send({
                "username": "ADMINISTRATOR",
                "password": "password"
            })
            .end(function(err, res){
                res.should.have.status(200);
                res.should.redirect;
                res.should.be.html;
                logger.log('debug', '[TEST] ' + res);
                done();
            });
    });
    it('should accept lowercase username', function(done) {
        chai.request.agent(server)
            .post('/api/login')
            .send({
                "username": "administrator",
                "password": "password"
            })
            .end(function(err, res){
                res.should.have.status(200);
                res.should.redirect;
                res.should.be.html;
                logger.log('debug', '[TEST] ' + res);
                done();
            });
    });
});

describe('/api/sensors', function() {
    it('should add a single sensor', function(done) {
        var agent = chai.request.agent(server);
        agent.post('/api/login')
            .send({
                "username": "administrator",
                "password": "password"
            })
            .then(function(err, res){
                res.should.have.status(200);
                return agent.post('/api/sensors')
                    .send({
                        "sensor_name": "floating_raft_temperature",
                        "reading_measurement": "temperature",
                        "reading_units": "°C",
                        "serial_number": "777-777-777",
                        "description": "The Floating Raft System's Temperature Sensor.",
                        "plot_title": "Floating Raft Temperature",
                        "plot_color": "green"
                    })
                    .end(function(res) {
                        console.log(res.body);
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('response');
                        res.body.response.should.be.a('object');
                        res.body.response.should.have.property('message');
                        res.body.response.should.have.property('code');
                        res.body.response.should.have.property('route');
                        res.body.response.should.have.property('timestamp');
                        res.body.response.message.should.be.a('string');
                        res.body.response.data.should.be.a('object');
                        res.body.response.code.should.be.a('string');
                        res.body.response.route.should.be.a('string');
                        res.body.response.timestamp.should.be.a('string');
                        res.body.response.data.should.have.property('_id');
                        res.body.response.data.should.have.property('sensor_name');
                        res.body.response.data.should.have.property('reading_measurement');
                        res.body.response.data.should.have.property('reading_units');
                        res.body.response.data.should.have.property('serial_number');
                        res.body.response.data.should.have.property('description');
                        res.body.response.data.should.have.property('plot_title');
                        res.body.response.data.should.have.property('plot_color');
                        res.body.response.data.should.have.property('last_reading');
                        res.body.response.data._id.should.be.a('string');
                        res.body.response.data.sensor_name.should.be.a('string');
                        res.body.response.data.reading_measurement.should.be.a('string');
                        res.body.response.data.reading_units.should.be.a('string');
                        res.body.response.data.serial_number.should.be.a('string');
                        res.body.response.data.description.should.be.a('string');
                        res.body.response.data.plot_title.should.be.a('string');
                        res.body.response.data.plot_color.should.be.a('string');
                        res.body.response.data.last_reading.should.be.a('string');
                        res.body.response.data.sensor_name.should.equal("floating_raft_temperature");
                        res.body.response.data.reading_measurement.should.equal('temperature');
                        res.body.response.data.reading_units.should.equal("°C");
                        res.body.response.data.serial_number.should.equal("777-777-777");
                        res.body.response.data.description.should.equal("The Floating Raft System's Temperature" +
                            " Sensor.");
                        res.body.response.data.plot_title.should.equal("Floating Raft Temperature");
                        res.body.response.data.plot_color.should.equal("green");
                        res.body.response.message.should.equal(Constants.MESSAGE_SENSOR_SAVED);
                        res.body.response.code.should.equal(Constants.CODE_SENSOR_SAVED);
                        res.body.response.route.should.equal('sensors');
                        logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                        done();
                    });
            });
    });
    it('should require login to add a single sensor', function(done) {
        var agent = chai.request.agent(server);
        agent.post('/api/sensors')
            .send({
                "sensor_name": "floating_raft_temperature",
                "reading_measurement": "temperature",
                "reading_units": "°C",
                "serial_number": "777-777-777",
                "description": "The Floating Raft System's Temperature Sensor.",
                "plot_title": "Floating Raft Temperature",
                "plot_color": "green"
            })
            .end(function(err, res){
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.a('object');
                res.body.error.should.have.property('message');
                res.body.error.should.have.property('description');
                res.body.error.should.have.property('code');
                res.body.error.should.have.property('route');
                res.body.error.should.have.property('timestamp');
                res.body.error.message.should.be.a('string');
                res.body.error.description.should.be.a('string');
                res.body.error.code.should.be.a('string');
                res.body.error.route.should.be.a('string');
                res.body.error.timestamp.should.be.a('string');
                res.body.error.message.should.equal(Constants.MESSAGE_INVALID_TOKEN);
                res.body.error.description.should.equal(Constants.DESCRIPTION_INVALID_TOKEN);
                res.body.error.code.should.equal(Constants.CODE_INVALID_TOKEN);
                res.body.error.route.should.equal('sensors');
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should require reading_measurement to add a single sensor', function(done) {
        var agent = chai.request.agent(server);
        agent.post('/api/login')
            .send({
                "username": "administrator",
                "password": "password"
            })
            .then(function(err, res){
                res.should.have.status(200);
                return agent.post('/api/sensors')
                    .send({
                        "sensor_name": "floating_raft_temperature",
                        "reading_units": "°C",
                        "serial_number": "777-777-777",
                        "description": "The Floating Raft Temperature Sensor",
                        "plot_title": "Floating Raft Temperature",
                        "plot_color": "green"
                    })
                    .then(function(err, res){
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('message');
                        res.body.error.should.have.property('description');
                        res.body.error.should.have.property('code');
                        res.body.error.should.have.property('route');
                        res.body.error.should.have.property('timestamp');
                        res.body.error.message.should.be.a('string');
                        res.body.error.description.should.be.a('string');
                        res.body.error.code.should.be.a('string');
                        res.body.error.route.should.be.a('string');
                        res.body.error.timestamp.should.be.a('string');
                        res.body.error.message.should.equal(Constants.MESSAGE_INVALID_SENSOR);
                        res.body.error.description.should.equal(Constants.DESCRIPTION_INVALID_SENSOR);
                        res.body.error.code.should.equal(Constants.CODE_INVALID_SENSOR);
                        res.body.error.route.should.equal('sensors');
                        logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                        done();
                    });
            });
    });
    it('should require reading_units to add a single sensor', function(done) {
        var agent = chai.request.agent(server);
        agent.post('/api/login')
            .send({
                "username": "administrator",
                "password": "password"
            })
            .then(function(err, res){
                res.should.have.status(200);
                return agent.post('/api/sensors')
                    .send({
                        "sensor_name": "floating_raft_temperature",
                        "reading_measurement": "temperature",
                        "serial_number": "777-777-777",
                        "description": "The Floating Raft System's Temperature Sensor.",
                        "plot_title": "Floating Raft Temperature",
                        "plot_color": "green"
                    })
                    .then(function(err, res){
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('message');
                        res.body.error.should.have.property('description');
                        res.body.error.should.have.property('code');
                        res.body.error.should.have.property('route');
                        res.body.error.should.have.property('timestamp');
                        res.body.error.message.should.be.a('string');
                        res.body.error.description.should.be.a('string');
                        res.body.error.code.should.be.a('string');
                        res.body.error.route.should.be.a('string');
                        res.body.error.timestamp.should.be.a('string');
                        res.body.error.message.should.equal(Constants.MESSAGE_SENSOR_DOES_NOT_EXIT);
                        res.body.error.description.should.equal(Constants.DESCRIPTION_SENSOR_DOES_NOT_EXIST);
                        res.body.error.code.should.equal(Constants.CODE_SENSOR_DOES_NOT_EXIST);
                        res.body.error.route.should.equal('sensors');
                        logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                        done();
                    });
            });
    });
    it('should require a sensor_name to add a single sensor', function(done) {
        var agent = chai.request.agent(server);
        agent.post('/api/login')
            .send({
                "username": "administrator",
                "password": "password"
            })
            .then(function(err, res){
                res.should.have.status(200);
                return agent.post('/api/sensors')
                    .send({
                        "reading_measurement": "temperature",
                        "reading_units": "°C",
                        "serial_number": "777-777-777",
                        "description": "The Floating Raft System's Temperature Sensor.",
                        "plot_title": "Floating Raft Temperature",
                        "plot_color": "green"
                    })
                    .then(function(err, res){
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('message');
                        res.body.error.should.have.property('description');
                        res.body.error.should.have.property('code');
                        res.body.error.should.have.property('route');
                        res.body.error.should.have.property('timestamp');
                        res.body.error.message.should.be.a('string');
                        res.body.error.description.should.be.a('string');
                        res.body.error.code.should.be.a('string');
                        res.body.error.route.should.be.a('string');
                        res.body.error.timestamp.should.be.a('string');
                        res.body.error.message.should.equal(Constants.MESSAGE_INVALID_SENSOR);
                        res.body.error.description.should.equal(Constants.DESCRIPTION_INVALID_SENSOR);
                        res.body.error.code.should.equal(Constants.CODE_INVALID_SENSOR);
                        res.body.error.route.should.equal('sensors');
                        logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                        done();
                    });
            });
    });
    it('should require a plot_title to add a single sensor', function(done) {
        var agent = chai.request.agent(server);
        agent.post('/api/login')
            .send({
                "username": "administrator",
                "password": "password"
            })
            .then(function(err, res){
                res.should.have.status(200);
                return agent.post('/api/sensors')
                    .send({
                        "sensor_name": "floating_raft_temperature",
                        "reading_measurement": "temperature",
                        "reading_units": "°C",
                        "serial_number": "777-777-777",
                        "description": "The Floating Raft System's Temperature Sensor.",
                        "plot_color": "green"
                    })
                    .then(function(err, res){
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('message');
                        res.body.error.should.have.property('description');
                        res.body.error.should.have.property('code');
                        res.body.error.should.have.property('route');
                        res.body.error.should.have.property('timestamp');
                        res.body.error.message.should.be.a('string');
                        res.body.error.description.should.be.a('string');
                        res.body.error.code.should.be.a('string');
                        res.body.error.route.should.be.a('string');
                        res.body.error.timestamp.should.be.a('string');
                        res.body.error.message.should.equal(Constants.MESSAGE_INVALID_SENSOR);
                        res.body.error.description.should.equal(Constants.DESCRIPTION_INVALID_SENSOR);
                        res.body.error.code.should.equal(Constants.CODE_INVALID_SENSOR);
                        res.body.error.route.should.equal('sensors');
                        logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                        done();
                    });
            });
    });
    it('should require a plot_color to add a single sensor', function(done) {
        var agent = chai.request.agent(server);
        agent.post('/api/login')
            .send({
                "username": "administrator",
                "password": "password"
            })
            .then(function(err, res){
                res.should.have.status(200);
                return agent.post('/api/sensors')
                    .send({
                        "sensor_name": "floating_raft_temperature",
                        "reading_measurement": "temperature",
                        "reading_units": "°C",
                        "serial_number": "777-777-777",
                        "description": "The Floating Raft System's Temperature Sensor.",
                        "plot_title": "Floating Raft Temperature",
                    })
                    .end(function(err, res){
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('message');
                        res.body.error.should.have.property('description');
                        res.body.error.should.have.property('code');
                        res.body.error.should.have.property('route');
                        res.body.error.should.have.property('timestamp');
                        res.body.error.message.should.be.a('string');
                        res.body.error.description.should.be.a('string');
                        res.body.error.code.should.be.a('string');
                        res.body.error.route.should.be.a('string');
                        res.body.error.timestamp.should.be.a('string');
                        res.body.error.message.should.equal(Constants.MESSAGE_INVALID_SENSOR);
                        res.body.error.description.should.equal(Constants.DESCRIPTION_INVALID_SENSOR);
                        res.body.error.code.should.equal(Constants.CODE_INVALID_SENSOR);
                        res.body.error.route.should.equal('sensors');
                        logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                        done();
                    });
            });
    });
    it('should require a serial_number to add a single sensor', function(done) {
        var agent = chai.request.agent(server);
        return agent.post('/api/login')
            .send({
                "username": "administrator",
                "password": "password"
            })
            .then(function(err, res){
                res.should.have.status(200);
                agent.post('/api/sensors')
                    .send({
                        "sensor_name": "floating_raft_temperature",
                        "reading_measurement": "temperature",
                        "reading_units": "°C",
                        "description": "",
                        "plot_title": "Floating Raft Temperature",
                        "plot_color": "green"
                    })
                    .then(function(err, res){
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('message');
                        res.body.error.should.have.property('description');
                        res.body.error.should.have.property('code');
                        res.body.error.should.have.property('route');
                        res.body.error.should.have.property('timestamp');
                        res.body.error.message.should.be.a('string');
                        res.body.error.description.should.be.a('string');
                        res.body.error.code.should.be.a('string');
                        res.body.error.route.should.be.a('string');
                        res.body.error.timestamp.should.be.a('string');
                        res.body.error.message.should.equal(Constants.MESSAGE_INVALID_SENSOR);
                        res.body.error.description.should.equal(Constants.DESCRIPTION_INVALID_SENSOR);
                        res.body.error.code.should.equal(Constants.CODE_INVALID_SENSOR);
                        res.body.error.route.should.equal('sensors');
                        logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                        done();
                    });
            });
    });
    it('should require a description to add a single sensor', function(done) {
        var agent = chai.request.agent(server);
        agent.post('/api/login')
            .send({
                "username": "administrator",
                "password": "password"
            })
            .then(function(err, res){
                res.should.have.status(200);
                return agent.post('/api/sensors')
                    .send({
                        "sensor_name": "floating_raft_temperature",
                        "reading_measurement": "temperature",
                        "reading_units": "°C",
                        "serial_number": "777-777-777",
                        "plot_title": "Floating Raft Temperature",
                        "plot_color": "green"
                    })
                    .then(function(err, res){
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('error');
                        res.body.error.should.be.a('object');
                        res.body.error.should.have.property('message');
                        res.body.error.should.have.property('description');
                        res.body.error.should.have.property('code');
                        res.body.error.should.have.property('route');
                        res.body.error.should.have.property('timestamp');
                        res.body.error.message.should.be.a('string');
                        res.body.error.description.should.be.a('string');
                        res.body.error.code.should.be.a('string');
                        res.body.error.route.should.be.a('string');
                        res.body.error.timestamp.should.be.a('string');
                        res.body.error.message.should.equal(Constants.MESSAGE_INVALID_SENSOR);
                        res.body.error.description.should.equal(Constants.DESCRIPTION_INVALID_SENSOR);
                        res.body.error.code.should.equal(Constants.CODE_INVALID_SENSOR);
                        res.body.error.route.should.equal('sensors');
                        logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                        done();
                    });
            });
    });
    it('should list ALL sensors on GET /sensors', function(done) {
        chai.request(server)
            .get('/api/sensors')
            .end(function(err, res){
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('array');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("sensors");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should list a SINGLE sensor on GET /sensors/<id>', function(done) {
        chai.request(server)
            .get('/api/sensors/')
            .end(function(err, res){
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('array');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("sensors");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should update a single sensor on UPDATE /sensors/<id>');
    it('should delete a single sensor on DELETE /sensors/<id>');
});

describe('/api/sensors/count', function() {
    it('should return the count of sensors', function(done) {
        chai.request(server)
            .get('/api/sensors/count')
            .end(function(err, res){
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('number');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("sensors");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
});

describe('/api/sensors/name/:sensor_name', function() {
    it('should return a single sensor with sensor_name', function(done) {
        chai.request(server)
            .get('/api/sensors/name/floating_raft_temperature')
            .end(function(err, res){
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('object');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("sensors");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should accept lowercase sensor_name', function(done) {
        chai.request(server)
            .get('/api/sensors/name/floating_raft_temperature')
            .end(function(err, res){
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('object');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("sensors");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should accept uppercase sensor_name', function(done) {
        chai.request(server)
            .get('/api/sensors/name/FLOATING_RAFT_TEMPERATURE')
            .end(function(err, res){
                console.log(res.body);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('object');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("sensors");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should return an empty array if no matching sensor_name', function(done) {
        chai.request(server)
            .get('/api/sensors/name/doesnotexist')
            .end(function(err, res){
                console.log(res.body);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('object');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("sensors");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
});

describe('/api/sensors/:id', function() {
    it('should return a single sensor with id', function(done) {
        var sensor_id = "";
        chai.request(server)
            .get('/api/sensors')
            .end(function(err, res){
                sensor_id = res.body.response.data[0]._id;
            });
        chai.request(server)
            .get('/api/sensors/' + sensor_id)
            .end(function(err, res) {
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('array');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("sensors");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should return an empty array if no matching id', function(done) {
        chai.request(server)
            .get('/api/sensors/abcdefg')
            .end(function(err, res){
                console.log(res.body);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('object');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("sensors");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
});

describe('/api/sensors/serial-number/:serial_number', function() {
    it('should return a single sensor with serial_number', function(done) {
        chai.request(server)
            .get('/api/sensors/serial-number/777-777-777')
            .end(function(err, res) {
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('object');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("sensors");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should return an empty array if no matching serial_number', function(done) {
        chai.request(server)
            .get('/api/sensors/serial-number/888')
            .end(function(err, res){
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('object');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("sensors");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    })
});

describe('/api/sensors/last-reading/:last_reading', function() {
    it('should return a single sensor with last_reading', function(done) {
        var last_reading = "";
        chai.request(server)
            .get('/api/sensors')
            .end(function(err, res) {
                console.log(JSON.stringify(res.body.response.data[0]));
                console.log(res.body.response.data);
                console.log(typeof res.body.response.data);
                last_reading = res.body.response.data[0].last_reading;
                console.log(last_reading);
            });
        console.log("Last Reading: " + last_reading);
        chai.request(server)
            .get('/api/sensors/last-reading/' + last_reading)
            .end(function(err, res) {
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('object');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("sensors");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should return an empty array if no matching last_reading', function(done) {
        chai.request(server)
            .get('/api/sensors/last-reading/99999')
            .end(function(err, res){
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('object');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("sensors");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
});

describe('/api/readings', function() {
    it('should return the last 100 readings', function(done) {
        chai.request(server)
            .get('/api/readings')
            .end(function(err, res) {
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('array');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("readings");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should return an empty array if no readings available', function(done) {
        chai.request(server)
            .get('/api/readings')
            .end(function(err, res){
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('array');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("readings");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
});

describe('/api/readings/count', function() {
    it('should return the total number of readings', function(done) {
        chai.request(server)
            .get('/api/readings/count')
            .end(function(err, res) {
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('number');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("readings");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
});

describe('/api/readings/sensor/:id', function() {
    it('should return all readings from the sensor with id', function(done) {
        var sensor_id = "";
        chai.request(server)
            .get('/api/sensors')
            .end(function(err, res){
                sensor_id = res.body.response.data[0]._id;
                console.log(sensor_id);
            });
        chai.request(server)
            .get('/api/readings/sensor/' + sensor_id)
            .end(function(err, res) {
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('object');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("readings");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should return an empty array if no readings available', function(done) {
        chai.request(server)
            .get('/api/readings/sensor/999999')
            .end(function(err, res){
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('array');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("readings");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
});

describe('/api/readings/sensor/:id/count', function() {
    it('should return the total number of readings from sensor with id', function(done) {
        var sensor_id = "";
        chai.request(server)
            .get('/api/sensors')
            .end(function(err, res){
                sensor_id = res.body.response.data[0]._id || 1;
            });
        chai.request(server)
            .get('/api/readings/sensor/' + sensor_id + '/count')
            .end(function(err, res) {
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('number');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("readings");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
});

describe('/api/readings/reading/:id', function() {
    it('should return a single reading with id', function(done) {
        var reading_id = "";
        chai.request(server)
            .get('/api/readings')
            .end(function(err, res){
                reading_id = res.body.response.data[0]._id || 1;
            });
        chai.request(server)
            .get('/api/readings/reading/' + reading_id)
            .end(function(err, res) {
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('object');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("readings");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should return an empty array if no reading available', function(done) {
        chai.request(server)
            .get('/api/data/reading/9999')
            .end(function(err, res){
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('object');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("readings");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
});

describe('/api/images', function() {
    it('should return the last 100 images', function(done) {
        chai.request(server)
            .get('/api/images')
            .end(function(err, res) {
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('array');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("images");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should return an empty array if no images available', function(done) {
        chai.request(server)
            .get('/api/images')
            .end(function(err, res){
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('array');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("images");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
});

describe('/api/images/count', function() {
    it('should return the number of images', function(done) {
        chai.request(server)
            .get('/api/images/count')
            .end(function(err, res) {
                console.log(res.body);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('number');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("images");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
});

describe('/api/images/search', function() {
    it('should search for images with the given tags, semester, system, year', function(done) {});
    it('should return an empty array if no images available', function(done) {
        chai.request(server)
            .post('/api/images/search')
            .end(function(err, res){
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('array');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("images");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
});

describe('/api/images/:id', function() {
    it('should return a single images with id', function(done) {
        var images_id = "";
        chai.request(server)
            .get('/api/images')
            .end(function(err, res){
                var data = res.body.response.data;
                if (data.length > 0) {
                    images_id = data[0]._id;
                } else {
                    images_id = "";
                }
            });
        chai.request(server)
            .get('/api/images/' + images_id)
            .end(function(err, res) {
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('array');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("images");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should return an image does not exist error if no matching image', function(done) {
        chai.request(server)
            .get('/api/images/image/9999')
            .end(function(err, res){
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.error.should.be.a('object');
                res.body.error.should.have.property('message');
                res.body.error.should.have.property('description');
                res.body.error.should.have.property('code');
                res.body.error.should.have.property('route');
                res.body.error.should.have.property('timestamp');
                res.body.error.message.should.be.a('string');
                res.body.error.description.should.be.a('object');
                res.body.error.code.should.be.a('string');
                res.body.error.route.should.be.a('string');
                res.body.error.timestamp.should.be.a('string');
                res.body.error.message.should.equal(Constants.MESSAGE_IMAGE_DOES_NOT_EXIST);
                res.body.error.description.should.equal(Constants.DESCRIPTION_IMAGE_DOES_NOT_EXIST);
                res.body.error.code.should.equal(Constants.CODE_IMAGE_DOES_NOT_EXIST);
                res.body.error.route.should.equal("images");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
});

describe('/api/images/date/:date', function() {
    it('should return all images with date', function(done) {
        var images_date = "";
        chai.request(server)
            .get('/api/images')
            .end(function(err, res){
                var data = res.body.response.data;
                if (data.length > 0) {
                    images_date = data[0].date;
                } else {
                    images_date = "1";
                }
            });
        chai.request(server)
            .get('/api/images/date/' + images_date)
            .end(function(err, res) {
                res.body.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('array');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("images");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should return an empty array if no images available', function(done) {
        chai.request(server)
            .get('/api/images/date/99999')
            .end(function(err, res){
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('array');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("images");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
});

describe('/api/images/tag/:tag', function() {
    it('should return all images with tag', function(done) {
        chai.request(server)
            .get('/api/images/tag/hello')
            .end(function(err, res) {
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('array');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("images");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
    it('should return an empty array if no images available', function(done) {
        chai.request(server)
            .get('/api/images/tag/hello')
            .end(function(err, res){
                res.body.should.be.a('object');
                res.body.should.have.property('response');
                res.body.response.should.be.a('object');
                res.body.response.should.have.property('message');
                res.body.response.should.have.property('data');
                res.body.response.should.have.property('code');
                res.body.response.should.have.property('route');
                res.body.response.should.have.property('timestamp');
                res.body.response.message.should.be.a('string');
                res.body.response.data.should.be.a('array');
                res.body.response.code.should.be.a('string');
                res.body.response.route.should.be.a('string');
                res.body.response.timestamp.should.be.a('string');
                res.body.response.message.should.equal(Constants.MESSAGE_REQUEST_PROCESSED);
                res.body.response.code.should.equal(Constants.CODE_REQUEST_PROCESSED);
                res.body.response.route.should.equal("images");
                logger.log('debug', '[TEST] ' + JSON.stringify(res.body));
                done();
            });
    });
});

