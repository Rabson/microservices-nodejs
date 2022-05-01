const { NotAuthorizedError, } = require('@lib/common/errors');
const { authentication, logger } = require('../utils');

const authenticate = async (req, res, next) => {
    try {
        logger.info('authenticate user token');
        const { authorization } = req.headers;
        if (!authorization) throw new NotAuthorizedError();
        const decoded = await authentication.verifyToken(authorization);
        req.userCtx = decoded;
        logger.info('Successfully authenticated user token');
        return next();
    } catch (error) {
        logger.error(`authenticate: Error while authenticating user token ${error.message}`);
        return next(error);
    }
};

module.exports = authenticate;
