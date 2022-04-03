const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      validationErrors: errors.errors.map((error) => {
        return { message: error.msg, field: error.param };
      }),
    });
  }

  next();
};

module.exports = { validateRequest };
