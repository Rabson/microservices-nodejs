const { logger } = require('../../utils');
const { File } = require('../../models/File');

const updateFileUploadStatus = async ({ data }) => {
    try {
        const { status, message, id, url } = data;
        await File.findByIdAndUpdate(id, {
            status,
            message,
            url
        })
    } catch (error) {
        logger.error(`listener:updateFileUploadStatus ${error}`);
        throw error;
    }
};

module.exports = {
    updateFileUploadStatus,
};
