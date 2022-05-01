const router = require('express').Router();
const Joi = require('joi');

// middlewares
const { serviceMapper, schemaValidator, } = require('../../middlewares');

// routes
const { signIn } = require('./SignIn');
const { signUp } = require('./SignUp');

router.post('/sign-in',
    schemaValidator(
        Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(15).required(),
        }), ['body']
    ),
    serviceMapper(signIn)
);

router.post('/sign-up',
    schemaValidator(
        Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(15).required(),
        }), ['body']
    ),
    serviceMapper(signUp)
);

module.exports = router;
