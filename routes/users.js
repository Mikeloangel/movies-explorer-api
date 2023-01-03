// users routes
// GET /me - returns user info (email, name)
// PATCH /me - updates user info (email, name)

const router = require('express').Router();
const { celebrate } = require('celebrate');

// validation schemas
const userPatchSchema = require('../request_validation_schemas/user-patch');

const {
  getMe,
  patchMe,
} = require('../controllers/users');

// get me
router.get('/me', getMe);

// patch me
router.patch('/me', celebrate({ body: userPatchSchema }), patchMe);

module.exports = router;
