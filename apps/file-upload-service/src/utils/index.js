const eventBus = require('./message_broker');
const fileManager = require('./file_manager');
const logger = require('./logger_manager');

module.exports = {
    eventBus,
    logger,
    fileManager,
};
