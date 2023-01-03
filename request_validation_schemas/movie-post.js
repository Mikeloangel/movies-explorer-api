const { Joi } = require('celebrate');

const validateUrlPattern = require('../utils/variables');

const moviePostSchema = Joi.object().keys({
  country: Joi.string().required(),
  director: Joi.string().required(),
  duration: Joi.number().required(),
  year: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required().pattern(new RegExp(validateUrlPattern)),
  trailerLink: Joi.string().required().pattern(new RegExp(validateUrlPattern)),
  thumbnail: Joi.string().required().pattern(new RegExp(validateUrlPattern)),
  movieId: Joi.number().required(),
  nameRU: Joi.string().required(),
  nameEN: Joi.string().required(),
});

module.exports = moviePostSchema;
