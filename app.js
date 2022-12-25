require('dotenv').config();

const {
  PORT = 3100,
  DB_NAME,
  DB_URL,
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

// routes
const indexRoutes = require('./routes/index');

mongoose.connect(`${DB_URL}/${DB_NAME}`);

const app = express();

// rate limiter
const limiter = expressLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// helmet
app.use(helmet());

// cors
const options = {
  origin: [
    'http://localhost:3000',
    'http://mestology.nomoredomains.club',
    'https://mestology.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders:
    [
      'Content-Type',
      'origin',
      'Authorization',
      'Accept',
      'Access-Control-Allow-Headers',
      'credentials',
      'withCredentials',
    ],
  credentials: true,
};

app.use('*', cors(options));

// cookie parser
app.use(cookieParser());

// body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// request logger
app.use(requestLogger);

// routes
app.use(indexRoutes);

// error logger
app.use(errorLogger);

// error handling
// celebrate validation errors
app.use(errors());
// centralized error handling
app.use(handleErrors);

// server
app.listen(PORT, () => {});
