const notFound = (req, res, next) => {
  res.status(404);
  next(`Not Found - ${req.originalUrl}`);
};

const errorHandler = (error, _, res, __) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  return statusCode !== 200 ?
    res.json({error}) :
    res.json({error: 'Internal server error'});
};

module.exports = {
  notFound,
  errorHandler,
};
