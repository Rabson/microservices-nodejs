const { User } = require('../../models/User');
const { authentication } = require('../../utils');
const { BadRequestError } = require('@lib/common/errors');

const signUp = async (payload) => {
    const { email, password } = payload;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError({ message: 'Email in use' });
    }

    const user = await User.create({ email, password });

    const userJwt = await authentication.generateToken({
        id: user._id, email: user.email,
    })

    return { data: { token: userJwt } };
}

module.exports = { signUp }


