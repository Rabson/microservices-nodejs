const commonResponse = require('@lib/common/response')
const errorHandler = (err, req, res, next) => {
    return commonResponse.failureResponse({
        req,
        res,
        stack: err.stack,
        message: err.message,
        statusCode: err.status || err.statusCode,
    })
};

module.exports = errorHandler;