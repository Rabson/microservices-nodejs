const { successResponse } = require('@lib/common/response');

const serviceMapper = (service) => async (req, res, next) => {
    try {
        return successResponse({
            ...await service(req.DTO, req.userCtx ? req.userCtx : {}) || {},
            req,
            res,
        });
    } catch (error) { return next(error); }
};

module.exports = serviceMapper;
