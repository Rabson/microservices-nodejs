const mongoose = require('mongoose');
const uploadConst = require('@lib/common/constants/upload');

const FileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, required: true },
    name: { type: String, required: true },
    message: { type: String, default: '' },
    url: { type: String, default: null },
    meta: { type: Object, required: true },
    status: {
        type: String,
        enum: Object.values(uploadConst.status),
        default: uploadConst.status.PROCESSING
    },
}, { timestamps: true, versionKey: false, });


const File = mongoose.model('File', FileSchema, 'files');

module.exports = { File }