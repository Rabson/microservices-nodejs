const bcrypt = require('bcrypt');
const util = require('util');

const hashGenerator = {
  hash: util.promisify(bcrypt.hash),
  compare: util.promisify(bcrypt.compare),
};

/**
  * Hash Password Method
  * @param {string} password
  * @returns {string} returns hashed password
  */
const hash = (password, rounds = 10) => hashGenerator
  .hash(password, rounds);

/**
  * comparePassword
  * @param {string} PasswordHash
  * @param {string} password
  * @returns {Boolean} return True or False
  */
const compare = (password, PasswordHash) => hashGenerator
  .compare(password, PasswordHash);

module.exports = {
  compare,
  hash,
};
