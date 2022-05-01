const amqp = require('amqplib');
const logger = require('../logger_manager');

class Connect {
    instance;

    conn;

    queue;

    ch;

    exchange;

    constructor() {
        if (!Connect.instance) {
            Connect.instance = this;
        }
        return Connect.instance;
    }

    async init({ config, queue = [], exchange = [] }) {
        const conn = await amqp.connect(config);
        this.conn = conn;
        this.queue = queue;
        this.exchange = exchange;
        this.ch = {};
        await this._consumer();
    }

    async _consumer() {
        const ch = await this.conn.createChannel();
        this.queue.forEach(async (QUEUE) => {
            await ch.assertQueue(QUEUE.name, { durable: false });
            if (QUEUE.handler) {
                this.ch.consume(QUEUE.name, async (msg) => {
                    try {
                        await QUEUE.handler({ fields: msg, data: JSON.parse(msg.content) });
                        ch.ack(msg);
                    } catch (error) {
                        logger.error(`Connect:_consumer:${QUEUE.handler.name} ${QUEUE.name}, message: ${error.message}`);
                        logger.error(`Connect:_consumer:${QUEUE.handler.name} ${QUEUE.name} stack: ${error.stack}`);
                    }
                });
                logger.info(`Connect:_consumer: listener: ${QUEUE.name} , handler: ${QUEUE.handler.name}`);
            } else {
                logger.info(`Connect:_consumer: Producer: ${QUEUE.name}`);
            }
        });
        this.ch = ch;
    }

    sendToQueue(queue, data) {
        this.ch.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    }

    publish({ exchange, rKey = '' }, data) {
        this.ch.publish(exchange, rKey, Buffer.from(JSON.stringify(data)));
    }
}

module.exports = new Connect();
