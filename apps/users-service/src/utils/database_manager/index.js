const mongoose = require('mongoose');

class Database {
    static async init(uri, option = {}) {
        return mongoose.connect(uri, {
            ...option
        });
    }

    static isValidObjectId = (id) => mongoose.isValidObjectId(id)
}

module.exports = Database;
