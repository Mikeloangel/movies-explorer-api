const router = require('express').Router();

// middleware auth
const { auth } = require('../middlewares/auth');

// all routes
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const authRoutes = require('./auth');

const ResourceNotFoundError = require('../errors/not-found-error');

// unprotected routes
router.use('/', authRoutes);

// protected routes
router.use(auth);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

// handle 404
router.all('*', (req, res, next) => {
  next(new ResourceNotFoundError());
});

module.exports = router;
