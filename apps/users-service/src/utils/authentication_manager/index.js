/**
 * @module AuthenticationManager
 * @description Handles JWT based authentication & authorization
 * @author YogeshNishad
 */
const jwt = require('jsonwebtoken');
const assert = require('assert');
const util = require('util');
const { ApiError } = require('@lib/common/errors');

const authentication = {
    sign: util.promisify(jwt.sign),
    verify: util.promisify(jwt.verify),
    decode: util.promisify(jwt.decode),
};

class AuthenticationManager {
    _config = {};

    constructor() {
        if (!AuthenticationManager.instance) {
            AuthenticationManager.instance = this;
        }
        return AuthenticationManager.instance;
    }

    async init(config) {
        this._config = config;
    }


    /**
     * Generate and returns token for User
     *
     * @param {Object} Data
     * @returns {String} Token
     */
    generateToken = async (data) => {
        assert.equal(typeof data, 'object', 'Error: Token data must be an Object');

        return authentication.sign(data, this._config.secretKey,
            {
                expiresIn: this._config.expiry || '3h',
                algorithm: 'HS256',
                issuer: this._config.issuer,
                audience: 'aud',
                subject: 'Auth Service',
            });
    };

    /**
     * Verify user token with respect to Algorithm, Expiry, Issuer, etc
     *
     * @param {String} authorization Token
     * @returns {Object} Decoded Token
     */
    verifyToken = async (authorization) => {
        try {
            assert.equal(typeof authorization, 'string', 'Error: Token data must be string');

            const parts = authorization.split('.');
            const header = JSON.parse(Buffer.from(parts[0], 'base64'));
            const payload = Buffer.from(parts[1], 'base64');
            const schema = header.alg;

            switch (schema) {
                case 'HS256':
                    await authentication.verify(authorization, this._config.secretKey,
                        {
                            expiresIn: this._config.expiry || '3h',
                            algorithm: 'HS256',
                            issuer: this._config.issuer,
                            audience: 'aud',
                            subject: 'Auth Service',
                        });
                    break;
                default:
                    throw new ApiError({
                        message: 'Invalid algorithm of the token',
                        statusCode: 401
                    });
            }

            const decodedJWT = JSON.parse(payload);

            const now = Math.round(new Date().getTime() / 1000);

            if (decodedJWT.nbf && decodedJWT.nbf > now) throw new Error('Invalid Not before claim');

            return decodedJWT;
        } catch (error) {
            throw new ApiError({ message: error.message, statusCode: 401 });
        }
    };


}

module.exports = new AuthenticationManager();