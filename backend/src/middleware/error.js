const errorMiddleware = (err, req, res, next) => {
  console.error("Error:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    error: "Internal server error",
    message: err.message,
  });
};

module.exports = errorMiddleware;
