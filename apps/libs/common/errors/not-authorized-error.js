const ApiError = require('./api-error');

/**
 * Class representing an NotAuthorized error.
 * @extends ApiError
 */
class NotAuthorizedError extends ApiError {
    /**
     * Creates an NotAuthorized error.
     * @param {string} message - Error message.
     */
    constructor({ message = 'UNAUTHORIZED', stack, } = {}) {
        super({ message, statusCode: 401, stack, });
    }
}

module.exports = NotAuthorizedError;
