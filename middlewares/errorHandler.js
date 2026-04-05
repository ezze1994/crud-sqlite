const AppError = require("../errors/AppError");

module.exports = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.originalUrl}`, err);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors ? { errors: err.errors } : {}),
    });
  }

  if (err.code === "SQLITE_CONSTRAINT") {
    return res.status(400).json({
      success: false,
      message: "Error de base de datos",
      errors: ["Violación de restricción en SQLite"],
    });
  }

  if (err.code === "SQLITE_ERROR") {
    return res.status(400).json({
      success: false,
      message: "Error SQL",
      errors: [err.message],
    });
  }

  return res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });
};