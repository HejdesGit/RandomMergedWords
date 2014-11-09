var winston = require('winston'),
    Papertrail = require('winston-papertrail').Papertrail;


module.exports = (function () {
    var config = {
        host: 'logs.papertrailapp.com',
        port: '12345'
    };

    var logger,
        consoleLogger = new winston.transports.Console({
            level: 'debug',
            timestamp: function() {
                return new Date().toString();
            },
            colorize: true
        }),
        ptTransport = new Papertrail({
            host: config.host,
            port: config.port,
            hostname: 'web-01',
            level: 'debug',
            colorize: true,
            logFormat: function(level, message) {
                return '[' + level + '] ' + message;
            }
        });

    ptTransport.on('error', function(err) {
        logger && logger.error(err);
    });

    ptTransport.on('connect', function(message) {
        logger && logger.info(message);
    });

    var logger = new winston.Logger({
        levels: {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3
        },
        colors: {
            debug: 'blue',
            info: 'green',
            warn: 'red',
            error: 'red',
            auth: 'red'
        },
        transports: [
            ptTransport,
            consoleLogger
        ]
    });

    logger.info('this is my message ' + new Date().getTime());

    var logger,
        consoleLogger = new winston.transports.Console({
            level: 'debug',
            timestamp: function() {
                return new Date().toString();
            },
            colorize: true
        }),
        ptTransport = new Papertrail({
            host: 'logs.papertrailapp.com',
            port: 12345,
            hostname: 'web-01',
            level: 'debug',
            colorize: true,
            logFormat: function(level, message) {
                return '[' + level + '] ' + message;
            }
        });

    ptTransport.on('error', function(err) {
        logger && logger.error(err);
    });

    ptTransport.on('connect', function(message) {
        logger && logger.info(message);
    });

    var logger = new winston.Logger({
        levels: {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3
        },
        colors: {
            debug: 'blue',
            info: 'green',
            warn: 'red',
            error: 'red',
            auth: 'red'
        },
        transports: [
            ptTransport,
            consoleLogger
        ]
    });

    return {
        logger: logger,
        consoleLogger: consoleLogger
    };
}());
