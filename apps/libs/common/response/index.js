module.exports = {
    /**
     * Common Success Json Response Method
     * @param {object} res express response
     * @param {string} message
     * @param {object} data
     * @param {number} statusCode
     * @returns {string} returns response
     */
    successResponse({
        res, data = {}, statusCode = 200, message = 'Success'
    }) {
        return res.status(statusCode).json({
            success: true,
            message: message,
            statusCode,
            data,
        });
    },
    /**
       * Common Failure Json Response Method
       * @param {object} res express response
       * @param {object} req express request
       * @param {string} message
       * @param {number} statusCode
       * @returns {string} returns response
       */
    failureResponse({
        res, message = 'Failure', stack, statusCode = 500,
    }) {
        return res.status(statusCode).json({
            success: false,
            message,
            statusCode,
            stack,
        });
    }
};
