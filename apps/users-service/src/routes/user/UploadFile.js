const fsPromises = require('fs').promises;
const { File } = require('../../models/File');
const publishers = require('../../events/publishers');

const UploadFile = async (payload, { id }) => {
    const { image } = payload;

    const fileDoc = await File.create({
        name: image.name,
        meta: image,
        userId: id,
    })

    publishers.uploadFile(
        {
            id: fileDoc._id,
            contentType: image.type,
            fileName: image.name,
            fileData: await fsPromises.readFile(image.path),
        }
    )

    return { data: { id: fileDoc._id, } }
}

module.exports = { UploadFile }


