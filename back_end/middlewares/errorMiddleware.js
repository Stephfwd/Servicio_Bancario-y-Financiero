const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    // Solo mostramos el stack trace en desarrollo
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
};

module.exports = errorHandler;
