require('dotenv').config({ path: require('path').resolve('.env') });

const environments = Object.freeze({
    rabbitMq: process.env.RABBIT_MQ_URI,
    apiKey: process.env.SERVICE_API_KEY,
    services: {
        users: process.env.SERVICE_USER_ENDPOINT,
    },
    providers: {
        fileUpload: {
            endPoint: process.env.UPLOAD_ENDPOINT,
            bucket: process.env.BUCKET_UPLOAD,
            accessKey: process.env.ACCESS_KEY,
            secretKey: process.env.SECRET_KEY,
            region: process.env.REGION || 'default',
        }
    }
});

module.exports = environments;
