const router = require('express').Router();

const { authenticate } = require('../middlewares');

const auth = require('./auth');
const user = require('./user');
const webhook = require('./webhook');

router.use('/auth', authenticate, auth);
router.use('/user', authenticate, user);
router.use('/webhook', webhook);

module.exports = router;
