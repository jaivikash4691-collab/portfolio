const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`[Unhandled Error] ${err.message}`, err.stack);

  // MySQL specific error handling
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      message: 'Duplicate entry error: A record with this unique identifier already exists.',
      error: err.sqlMessage || err.message
    });
  }

  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({
      success: false,
      message: 'Foreign key constraint fails: referenced record does not exist.',
      error: err.sqlMessage || err.message
    });
  }

  const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;

  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
};

const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Endpoint Not Found - ${req.originalUrl}`
  });
};

module.exports = {
  errorHandler,
  notFound
};

