const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

// authenticaion middleware
module.exports.auth = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  // req.user = '63a81fba2cbfd4d7b7626972';
  // next();

  try {
    const payload = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev');
    req.user = payload;
    next();
  } catch (e) {
    next(new UnauthorizedError('Что-то не так с токеном'));
  }
};
