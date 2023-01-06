const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const UserExistsError = require('../errors/user-exists-error');
const WrongDataError = require('../errors/wrong-data-error');

// returns current user data
module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

// uodates current user data
module.exports.patchMe = (req, res, next) => {
  const { _id } = req.user;
  const { name, email } = req.body;

  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      if (err.code === 11000) {
        next(new UserExistsError());
      } else if (err.name === 'ValidationError') {
        next(new WrongDataError());
      } else {
        next(err);
      }
    });
};

// creates user in Db
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({
      name, email, password: hashedPassword,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new UserExistsError());
        return;
      }
      if (err.name === 'ValidationError') {
        next(new WrongDataError());
      } else {
        next(err);
      }
    });
};

// logs user in and sends JWT back
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: NODE_ENV === 'production',
      });

      res.send({ message: 'ok' });
    })
    .catch((err) => {
      res.clearCookie('jwt');
      next(err);
    });
};

// logout controller
module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.send({ message: 'До новых встреч!' });
};
