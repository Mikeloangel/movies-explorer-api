const Movie = require('../models/movie');

const WrongDataError = require('../errors/wrong-data-error');
const ForbiddenError = require('../errors/ForbiddenError');
const ResourceNotFoundError = require('../errors/not-found-error');

module.exports.postMovie = (req, res, next) => {
  const { _id } = req.user;

  Movie.create({ ...req.body, owner: _id })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new WrongDataError());
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id: userId } = req.user;
  const { id: movieId } = req.params;

  Movie.findOne({ _id: movieId })
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        next(new ForbiddenError('нет доступа к этой записи'));
        return;
      }
      Movie.deleteOne({ _id: movieId })
        .orFail()
        .then(() => {
          res.send({ message: 'ok' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new WrongDataError());
      } else if (err.name === 'DocumentNotFoundError') {
        next(new ResourceNotFoundError());
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .then((cards) => res.send(cards))
    .catch(next);
};
