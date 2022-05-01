const userEvent = require('@lib/common/constants/events');
const { logger } = require('../../utils');
const { eventBus, } = require('../../utils');

const uploadFile = async (payload) => {
    try {
        await eventBus.sendToQueue(userEvent.FileService.UPLOAD_FILE, payload);
    } catch (error) {
        logger.error(`publish:uploadFile ${error.message} ${error.stack}`);
    }
};

module.exports = {
    uploadFile,
};
