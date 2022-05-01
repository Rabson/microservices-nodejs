const { logger } = require('./utils');
const { loadQueueEvents } = require('./events');
const { eventBus, fileManager } = require('./utils');
const config = require('./config');

process.on('uncaughtException', (error = {}) => {
    logger.error(`Error (uncaughtException): Server stop due to unhandledRejection ${error.message}`);
    logger.error(`Stack trace (uncaughtException): ${error.stack}`);
    process.exit(1);
}).on('unhandledRejection', (error) => {
    logger.error(`Error (unhandledRejection): Server stop due to unhandledRejection ${error.message}`);
    logger.error(`Stack trace (unhandledRejection): ${error.stack}`);
    process.exit(1);
});


(async () => {
    try {
        fileManager.init({ ...config.providers.fileUpload });

        await eventBus.init({ config: config.rabbitMq, queue: loadQueueEvents, });

        logger.info('connected to rabbitMq');

    } catch (error) {
        logger.error(`Error : Server not able to start due to ${error.message}`);
        logger.error(`Stack trace : ${error.stack}`);
    }
})()
