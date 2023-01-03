// general routes
// POST /signin log in system (usess http only cookie)
// POST /signup register to system
// GET /signout logs out from system, deletes cookie

const router = require('express').Router();

const { celebrate } = require('celebrate');
const { login, logout, createUser } = require('../controllers/users');

// validation schemas
const authSigninSchema = require('../request_validation_schemas/auth-signin');
const authSignupSchema = require('../request_validation_schemas/auth-signup');

// signin
router.post('/signin', celebrate({ body: authSigninSchema }), login);

// signup
router.post('/signup', celebrate({ body: authSignupSchema }), createUser);

// signout
router.get('/signout', logout);

module.exports = router;
