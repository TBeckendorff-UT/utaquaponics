var express = require('express'),
    winston = require('winston'),
    expressWinston = require('express-winston'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    logger = require('./logger'),
    Configuration = require('./configuration'),
    routes = require('./routes'),
    mongoose = require('mongoose');

logger.info('Connecting to MongoDB URL: ' + Configuration.DB_URL, {tag: 'database'});
mongoose.connect(Configuration.DB_URL);
var db = mongoose.connection;

var app = express();
logger.info('Applying Express Configurations', {tag:'server'});
app.use(compression());
app.use('/public', express.static(__dirname + '/public'));
app.use('/apidoc', express.static(__dirname + '/apidoc'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/app', express.static(__dirname + '/app'));
app.use(session({secret: Configuration.SECRET_TOKEN}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressWinston.logger({
    transports: [
        new (require('winston-daily-rotate-file')) ({
            filename: Configuration.LOG_DIR + "-results.log",
            timestamp: true,
            datePattern: 'yyyy-MM-dd',
            prepend: true,
            level: 'debug'
        })
    ]
}));
app.use(routes);

db.once('open', function() {
    logger.info('Connected to MongoDB.', {tag: 'database'});
    app.listen(Configuration.PORT, Configuration.IP_ADDRESS);
    logger.info('Listening for Connections.', {tag: 'server'});
});

module.exports = app;