const { Joi } = require('celebrate');

const authSignupSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  name: Joi.string().min(2).max(30).required(),
  password: Joi.string().required(),
});

module.exports = authSignupSchema;
