const { User } = require('../../models/User');

const userProfile = async (_, { id }) => {
    const userDoc = await User.findById(id);
    return { data: userDoc }
}

module.exports = { userProfile }



