const { fileManager } = require('../utils')
const config = require('../config')
const path = require('path')
const axios = require('axios').default;

class FileUploadService {
    static async upload(data) {
        const { id, fileData, contentType, fileName } = data;
        return fileManager.upload({
            path: `test/${id}${path.extname(fileName)}`,
            fileData: Buffer.from(fileData),
            contentType,
            bucketName: config.providers.fileUpload.bucket,
            acl: false
        })
    }

    static async updateFileStatus(data) {
        await axios.post(
            `${config.services.users}/webhook/upload-file-status`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': config.apiKey,
                },
            }
        );
    }
}

module.exports = FileUploadService;