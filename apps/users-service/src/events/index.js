const eventsConst = require('@lib/common/constants/events');
const publishers = require('./publishers');
const listener = require('./listeners');

//* ******** publisher *********//
const publisherList = [
    { name: eventsConst.FileService.UPLOAD_FILE },
];

//* ******** listener *********//
const listenerList = [];

module.exports = {
    publishers,
    loadQueueEvents: [...publisherList, ...listenerList],
};
