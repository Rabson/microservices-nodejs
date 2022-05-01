const { BadRequestError } = require('@lib/common/errors');
const { User } = require('../../models/User');
const { authentication } = require('../../utils');

const signIn = async (payload) => {
    const { email, password } = payload;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        throw new BadRequestError({ message: 'Invalid credentials' });
    }

    const passwordsMatch = await existingUser.comparePassword(
        existingUser.password,
        password
    );

    if (!passwordsMatch) {
        throw new BadRequestError({ message: 'Invalid credentials' });
    }

    const userJwt = await authentication.generateToken({
        id: existingUser._id, email: existingUser.email,
    })

    return { data: { token: userJwt } };
}

module.exports = { signIn }


