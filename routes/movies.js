// movies routes
// POST / - adds movie
// DELETE /:id - deletes movie
// GET / - get movies list

const router = require('express').Router();
const { celebrate } = require('celebrate');

// validation schemas
const movieDeleteSchema = require('../request_validation_schemas/movie-delete');
const moviePostSchema = require('../request_validation_schemas/movie-post');

const {
  postMovie,
  deleteMovie,
  getMovies,
} = require('../controllers/movies');

// post movie
router.post('/', celebrate({ body: moviePostSchema }), postMovie);

// delete movie
router.delete('/:id', celebrate({ params: movieDeleteSchema }), deleteMovie);

// get movies list
router.get('/', getMovies);

module.exports = router;
