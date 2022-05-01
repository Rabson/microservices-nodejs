const authenticate = require('./authenticate.middleware');
const errorHandler = require('./error-handler.middleware');
const schemaValidator = require('./schema-validator.middleware');
const serviceMapper = require('./service-mapper.middleware');

module.exports = {
    authenticate,
    errorHandler,
    schemaValidator,
    serviceMapper,
};
