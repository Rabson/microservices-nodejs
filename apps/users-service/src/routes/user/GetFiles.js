const { File } = require('../../models/File');

const getFiles = async (_, { id }) => {
    const fileList = await File.find({ userId: id }, {}, { sort: { _id: -1 } });
    return { data: { records: fileList } }
}

module.exports = { getFiles }


