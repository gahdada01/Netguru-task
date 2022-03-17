const sanitizeBearerToken = (token) => {
  return token.replace(/^Bearer /, '');
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

module.exports = {
  sanitizeBearerToken,
  isEmpty,
};
