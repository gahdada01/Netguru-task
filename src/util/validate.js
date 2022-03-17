const {getMovieCount} = require('../models/Movies');
const {isEmpty} = require('./common');

const isBodyEmpty = (req, res, next) => {
  if (isEmpty(req.body)) {
    res.statusCode = 400;
    next('Invalid payload');
  }

  next();
};

const basicMonthlyLimit = async (req, res, next) => {
  const {userId, role} = req.user;

  try {
    if (role === 'basic') {
      const month = new Date().getMonth();
      const movieCount = await getMovieCount(userId, month + 1);

      if (movieCount > 4) {
        res.statusCode = 422;
        next('User montly limit reached');
      }
    }
  } catch (error) {
    next(error);
  }

  next();
};

const checkUserCredentials = (req, res, next) => {
  const {username, password} = req.body;

  if (!username || !password) {
    res.statusCode = 400;
    next('Invalid username or password');
  }

  next();
};

const checkTitle = (req, res, next) => {
  const {title} = req.body;

  if (!title) {
    res.statusCode = 400;
    next('Invalid title');
  }

  next();
};

module.exports = {
  checkTitle,
  checkUserCredentials,
  isBodyEmpty,
  basicMonthlyLimit,
};
