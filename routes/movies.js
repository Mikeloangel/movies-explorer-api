// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image,
// trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies

// # удаляет сохранённый фильм по id
// DELETE /movies/_id

const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const {
  postMovie,
  deleteMovie,
  getMovies,
} = require('../controllers/movies');

router.post('/', postMovie);
router.delete('/:id', deleteMovie);
router.get('/', getMovies);

module.exports = router;
