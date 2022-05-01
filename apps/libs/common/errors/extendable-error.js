/**
 * @extends Error
 */
class ExtendableError extends Error {
    constructor({ message, statusCode, stack, } = {}) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = statusCode;
        this.stack = stack;
        Error.captureStackTrace(this, this.constructor.name);
    }
}

module.exports = ExtendableError;
