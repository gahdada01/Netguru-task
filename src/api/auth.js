const express = require('express');
const router = express.Router();
const {AuthError} = require('../util/auth');
const {authFactory} = require('../util/auth');
const {JWT_SECRET} = require('../util/config');
const {isBodyEmpty, checkUserCredentials} = require('../util/validate');

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET env var. Set it and restart the server');
}

const auth = authFactory(JWT_SECRET);

// Authenticate user
router.use(isBodyEmpty);
router.use(checkUserCredentials);

router.post('/', (req, res, next) => {
  const {username, password} = req.body;

  try {
    const token = auth(username, password);

    return res.status(200).json({token});
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({error: error.message});
    }

    next(error);
  }
});

module.exports = router;
