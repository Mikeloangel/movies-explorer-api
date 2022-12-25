// general routes
// POST /signin log in system (usess http only cookie)
// POST /signup register to system
// GET /signout logs out from system, deletes cookie

const router = require('express').Router();

const { Joi, celebrate } = require('celebrate');
const { login, logout, createUser } = require('../controllers/users');

// signin
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

// signup
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().min(2).max(30),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

// signout
router.get('/signout', logout);

module.exports = router;
