const logger = require('../utils/logger');

/**
 * Global error handler middleware.
 * Catches all errors thrown via next(err) or unhandled throws in async routes.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';

  // Never leak stack traces in production
  if (process.env.NODE_ENV !== 'production') {
    logger.error({ err, path: req.path, method: req.method }, message);
  } else {
    logger.error({ status, path: req.path, method: req.method }, message);
  }

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

module.exports = { errorHandler };
