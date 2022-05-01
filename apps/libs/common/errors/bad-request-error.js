const ApiError = require('./api-error');

/**
 * Class representing an BadRequst error.
 * @extends ApiError
 */
class BadRequestError extends ApiError {
    /**
     * Creates an BadRequst error.
     * @param {string} message - Error message.
     */
    constructor({ message = 'BAD_REQUEST', stack, } = {}) {
        super({ message, statusCode: 400, stack, });
    }
}

module.exports = BadRequestError;
