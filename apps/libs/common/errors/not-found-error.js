const ApiError = require('./api-error');

/**
 * Class representing an NotFound error.
 * @extends ApiError
 */
class NotFoundError extends ApiError {
    /**
     * Creates an NotFound error.
     * @param {string} message - Error message.
     */
    constructor({ message = 'NOT_FOUND', stack, } = {}) {
        super({ message, statusCode: 404, stack, });
    }
}

module.exports = NotFoundError;
