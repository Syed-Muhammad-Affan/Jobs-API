const notFound = (res, req, next) => {
  res.status(404).send('Route not found');
};

module.exports = notFound;
