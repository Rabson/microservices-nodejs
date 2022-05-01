const router = require('express').Router();
const Joi = require('joi');
const config = require('../../config')
const listeners = require('../../events/listeners')
const uploadConst = require('@lib/common/constants/upload');

// middlewares
const { schemaValidator, serviceMapper } = require('../../middlewares');

router.post('/upload-file-status',
    (req, res, next) => {
        const apiKey = req.headers['api-key'];
        if (!apiKey) {
            return res.status(403).send({ message: 'api-key is required' })
        }
        if (apiKey === config.apiKey) {
            return next();
        }
        return res.status(403).send({ message: 'Invalid api-key' })
    },
    schemaValidator(
        Joi.object({
            id: Joi.string().required(),
            message: Joi.string(),
            url: Joi.string().required(),
            status: Joi.string().valid(
                uploadConst.status.UPLOADED,
                uploadConst.status.FAILED,
            ),
        }), ['body']
    ),
    serviceMapper(async (payload) => {
        await listeners.updateFileUploadStatus({ data: payload });
    })
);


module.exports = router;
