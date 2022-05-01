/**
 * @module FileManager
 * @description Library for File Management
 * @author YogeshNishad
 */

const fs = require('fs');
const AWS = require('aws-sdk');

class FileUploadManager {
    _S3;

    _s3;

    config = {};

    constructor() {
        if (!FileUploadManager.instance) {
            this.client = {};
            FileUploadManager.instance = this;
        }

        return FileUploadManager.instance;
    }

    init({
        endPoint, cdnEndPoint, accessKey, secretKey
    }) {
        this.config = {
            endPoint, cdnEndPoint, accessKey, secretKey
        };
        this._S3 = new AWS.S3({
            endpoint: new AWS.Endpoint(endPoint),
            accessKeyId: accessKey,
            secretAccessKey: secretKey,
            apiVersion: 'latest'
        });
    }

    /**
    * Upload File
    *
    * @function uploadFile
    * @param {Buffer} buffer File Buffer
    * @param {String} fileName File name
    * @param {String} client Client name
    * @returns {Object} Upload results
    */
    upload = ({
        path, fileData, contentType, bucketName, acl = false
    }) => {
        const uploadParams = {
            Key: path,
            Bucket: bucketName,
            Body: typeof fileData === typeof '' ? fs.createReadStream(fileData) : fileData,
            ContentType: contentType,
            ...(acl ? null : ({ ACL: 'public-read' })),
        };
        return this._S3.upload(uploadParams).promise();
    }

}

module.exports = new FileUploadManager();
