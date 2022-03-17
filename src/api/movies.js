const express = require('express');
const router = express.Router();
const {Movies} = require('../models/Movies');
const {AuthError, verifyToken} = require('../util/auth');
const {getMovieDetails} = require('../util/omdbapi');
const {
  isBodyEmpty,
  basicMonthlyLimit,
  checkTitle,
} = require('../util/validate');

// Verify Token
router.use(verifyToken);

router.get('/', async (req, res, next) => {
  try {
    const {userId} = req.user;
    const movieList = await Movies.find({creator: userId});

    return res.status(200).json(movieList);
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({error: error.message});
    }

    next(error);
  }
});

router.use(isBodyEmpty);
router.use(checkTitle);
router.use(basicMonthlyLimit);

router.post('/', async (req, res, next) => {
  const {userId} = req.user;

  try {
    const movieDetails = await getMovieDetails(req.body.title);

    const newMovie = new Movies({
      ...movieDetails,
      creator: userId,
    });

    const movie = await newMovie.save();

    return res.status(200).json(movie);
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({error: error.message});
    }

    next(error);
  }
});

module.exports = router;
