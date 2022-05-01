const router = require('express').Router();
const Joi = require('joi');
const multipart = require('connect-multiparty');

// middlewares
const { serviceMapper, schemaValidator } = require('../../middlewares');

// routes
const { userProfile } = require('./UserProfile');
const { UploadFile } = require('./UploadFile');
const { getFiles } = require('./GetFiles');


router.get('/files', serviceMapper(getFiles));

router.post('/upload-file',
    multipart(),
    schemaValidator(
        Joi.object({
            image: Joi.object({
                size: Joi.number().max(5000000).required().messages({
                    'number.max': 'Image size should not be greater then 5MB',
                }),
                name: Joi.string().required(),
                originalFilename: Joi.string().required(),
                type: Joi.string().valid('image/jpeg', 'image/jpg', 'image/png').required(),
                path: Joi.string().required(),
                headers: Joi.any().required(),
                fieldName: Joi.string().required(),
            }).required()
        }), ['files']
    ),
    serviceMapper(UploadFile)
);

router.get('/', serviceMapper(userProfile));

module.exports = router;
