const uploadConst = require('@lib/common/constants/upload');
const FileUploadService = require('../../services/file-upload.service');
const publishers = require('../publishers');
const { logger } = require('../../utils');

const uploadFile = async ({ data }) => {
    try {
        const fileResp = await FileUploadService.upload(data);
        publishers.updateFileUploadStatus({
            status: uploadConst.status.UPLOADED,
            url: fileResp.Location,
            id: data.id,
        })
    } catch (error) {
        logger.error(`listener:uploadFile ${error}`);
        publishers.updateFileUploadStatus({
            status: uploadConst.status.FAILED,
            url: fileResp.Location,
            message: error.message,
            id: data.id
        })
        throw error;
    }
};

const updateFileUploadStatus = async ({ data }) => {
    try {
        await FileUploadService.updateFileStatus(data);
    } catch (error) {
        logger.error(`listener:updateFileUploadStatus ${error}`);
        throw error;
    }
};


module.exports = { uploadFile, updateFileUploadStatus };
