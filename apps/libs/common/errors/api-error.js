const ExtendableError = require('./extendable-error');

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class ApiError extends ExtendableError {
    /**
       * Creates an API error.
       * @param {string} message - Error message.
       * @param {number} status - HTTP status code of error.
       */
    constructor({
        message = 'INTERNAL_SERVER_ERROR',
        statusCode = 500,
        stack,
    } = {}) {
        super({
            message, statusCode, stack,
        });
    }
}

module.exports = ApiError;
