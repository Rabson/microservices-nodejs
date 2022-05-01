const express = require('express')
require('express-async-errors');
const { errorHandler } = require('./middlewares');
const { NotFoundError } = require('@lib/common/errors');
const routes = require('./routes');

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

module.exports = { app };
