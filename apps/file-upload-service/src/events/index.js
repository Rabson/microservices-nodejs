const eventsConst = require('@lib/common/constants/events');
const listeners = require('./listeners');

//* ******** publisher *********//
const publisherList = [
    { name: eventsConst.UserService.UPDATE_UPLOAD_STATUS },

];

//* ******** listener *********//
const listenerList = [
    {
        name: eventsConst.UserService.UPDATE_UPLOAD_STATUS,
        handler: listeners.updateFileUploadStatus,
    },
    {
        name: eventsConst.FileService.UPLOAD_FILE,
        handler: listeners.uploadFile,
    },
];

module.exports = {
    loadQueueEvents: [...publisherList, ...listenerList],
};
