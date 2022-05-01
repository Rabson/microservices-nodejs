const events = require('@lib/common/constants/events');
const { logger, eventBus } = require('../../utils');

const updateFileUploadStatus = async (payload) => {
    try {
        await eventBus.sendToQueue(events.UserService.UPDATE_UPLOAD_STATUS, payload);
    } catch (error) {
        logger.error(`publish:updateFileUploadStatus ${error.message} ${error.stack}`);
    }
};

module.exports = {
    updateFileUploadStatus,
};
