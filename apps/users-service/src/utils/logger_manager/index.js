/* eslint-disable no-console */
const winston = require('winston');

const { createLogger } = winston;

const logger = createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'DD-MM-YYYY HH:MM:SS.ss' }),
        winston.format.json(),
    ),
    transports: [],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//

logger.add(new winston.transports.Console({ format: winston.format.json() }));
// logger.add(new transports.File({ filename: 'logs/combined.log' }));
// logger.add(new transports.File({ filename: 'logs/error.log', level: 'error' }));

logger.on('error', (err) => {
    console.error('//----------------- Logger on error event--------------//');
    console.error(err);
    console.error('//----------------- Logger on error event--------------//');
});

logger.stream = { write: (message) => { logger.info(message.trim()); } };

module.exports = logger;
