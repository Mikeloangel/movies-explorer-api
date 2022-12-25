// users routes
// GET /me - returns user info (email, name)
// PATCH /me - updates user info (email, name)

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMe,
  patchMe,
} = require('../controllers/users');

// get me
router.get('/me', getMe);

// patch me
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email(),
    }),
  }),
  patchMe,
);

module.exports = router;
