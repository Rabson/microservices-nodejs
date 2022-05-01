require('dotenv').config({ path: require('path').resolve('.env') });

const environments = Object.freeze({
    env: process.env.NODE_ENV,
    port: process.env.PORT || 9001,
    encryptionSalt: process.env.ENCRYPTION_SALT,
    mongoUri: process.env.MONGO_URI,
    apiKey: process.env.SERVICE_API_KEY,
    rabbitMq: 'amqp://localhost',
    jwt: {
        secretKey: process.env.JWT_SECRET || 'secret',
        issuer: process.env.ISSUER || 'HOPIND',
        expiry: process.env.JWT_EXPIRY || '2d',
        audience: process.env.JWT_AUD || 'HOPIND APP',
        subject: process.env.JWT_SUB || 'AUTH SERVICE',
    },
});

module.exports = environments;
