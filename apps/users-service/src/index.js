const mongoose = require('mongoose');
const { app } = require('./app');
const { logger, authentication, database, eventBus } = require('./utils');
const config = require('./config');
const { loadQueueEvents } = require('./events');

const PORT = config.port;

process.on('uncaughtException', (error) => {
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
        await eventBus.init({ config: config.rabbitMq, queue: loadQueueEvents, });

        logger.info('connected to rabbitMq');

        const connection = await database.init(config.mongoUri);

        logger.info(`connected to database (${connection.connection.name})`);

        await authentication.init(config.jwt);

        app.listen(PORT, () => {
            logger.info(`server started on port ${PORT} (${config.env})`);
            logger.info(`Listening: http://localhost:${PORT}`);
        });
    } catch (error) {
        if (error instanceof mongoose.Error) {
            logger.error(`Error while connecting to data base : ${error.message}`);
            logger.error(`Stack trace : ${error.stack}`);
        } else {
            logger.error(`Error : Server not able to start due to ${error.message}`);
            logger.error(`Stack trace : ${error.stack}`);
        }
    }
})()
