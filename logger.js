var winston = require('winston'),
    Configuration = require('./configuration');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp: true,
            level: 'info',
            colorize: true
        }),
        new (require('winston-daily-rotate-file'))({
            filename: Configuration.LOG_DIR + "-results.log",
            timestamp: true,
            datePattern: 'yyyy-MM-dd',
            prepend: true,
            level: 'debug'
        })
    ]
});

logger.cli();

module.exports = logger;
