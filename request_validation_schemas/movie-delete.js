const { Joi } = require('celebrate');

const movieDeleteSchema = Joi.object().keys({
  id: Joi.string().length(24).hex().required(),
});

module.exports = movieDeleteSchema;
