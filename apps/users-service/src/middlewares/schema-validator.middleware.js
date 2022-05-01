const schemaValidator = (schema, property) => async (req, res, next) => {
    try {
        let requestData = {};
        if (Array.isArray(property)) {
            property.forEach((key) => { requestData = { ...requestData, ...req[key] }; });
        } else {
            requestData = req[property];
        }
        await schema.validateAsync(requestData,);
        req.DTO = requestData;
        next();
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

module.exports = schemaValidator;
