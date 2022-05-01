const database = require('./database_manager');
const eventBus = require('./message_broker');
const logger = require('./logger_manager');
const authentication = require('./authentication_manager');
const passwordHash = require('./password_manager');

module.exports = {
    database,
    eventBus,
    authentication,
    logger,
    passwordHash,
};
