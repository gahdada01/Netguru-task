const express = require('express');
const router = express.Router();

const auth = require('./auth');
const movies = require('./movies');

router.use('/auth', auth);
router.use('/movies', movies);

module.exports = router;
