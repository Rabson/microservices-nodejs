const mongoose = require('mongoose');
const { passwordHash } = require('../utils')

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true, versionKey: false, });


UserSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await passwordHash.hash(this.get('password'), 10);
        this.set('password', hashed);
    }
    done();
});

UserSchema.methods.comparePassword = function (plaintext) {
    return passwordHash.compare(plaintext, this.password);
};

const User = mongoose.model('User', UserSchema, 'users');

module.exports = { User }