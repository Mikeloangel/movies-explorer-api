const { Joi } = require('celebrate');

const authSigninSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

module.exports = authSigninSchema;
