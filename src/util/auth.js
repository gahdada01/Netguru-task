const jwt = require('jsonwebtoken');
const {users} = require('./users');
const {sanitizeBearerToken} = require('./common');
const {JWT_SECRET} = require('./config');

// eslint-disable-next-line require-jsdoc
class AuthError extends Error {}

const authFactory = (secret) => (username, password) => {
  const user = users.find((u) => u.username === username);

  if (!user || user.password !== password) {
    throw new AuthError('Invalid username or password');
  }

  return jwt.sign(
    {
      userId: user.id,
      name: user.name,
      role: user.role,
    },
    secret,
    {
      issuer: 'https://www.netguru.com/',
      subject: `${user.id}`,
      expiresIn: 30 * 60,
    },
  );
};

const verifyToken = (req, _, next) => {
  const token = sanitizeBearerToken(req.headers.authorization);

  jwt.verify(token, JWT_SECRET, (error, userDetails) => {
    if (error) {
      if (error.message === 'invalid signature') {
        next('Invalid token');
      }

      next('Token expired');
    }

    req.user = userDetails;
    next();
  });
};

module.exports = {
  verifyToken,
  authFactory,
  AuthError,
};
