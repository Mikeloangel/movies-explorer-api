require('dotenv').config();

const {
  PORT = 3000,
  DB_NAME = 'bitfilmsdb',
  DB_URL = 'mongodb://localhost:27017',
} = process.env;

// libs
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const expressLimiter = require('express-rate-limit');
const helmet = require('helmet');

// middlewares
const { handleErrors } = require('./middlewares/handleErrors');
const { errorLogger, requestLogger } = require('./middlewares/logger');

// utils
const { limiterSettings } = require('./utils/ratelimiter');
const { corsOptions } = require('./utils/corsoptions');

// routes
const indexRoutes = require('./routes');

// db and app
mongoose.set('strictQuery', false);
mongoose.connect(`${DB_URL}/${DB_NAME}`);
const app = express();

// request logger
app.use(requestLogger);

// rate limiter
app.use(expressLimiter(limiterSettings));

// helmet
app.use(helmet());

// cors
app.use('*', cors(corsOptions));
// app.use('*', cors());

// cookie parser
app.use(cookieParser());

// body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api', indexRoutes);

// error logger
app.use(errorLogger);

// error handling
// celebrate validation errors
app.use(errors());
// centralized error handling
app.use(handleErrors);

// server
app.listen(PORT, () => {});
