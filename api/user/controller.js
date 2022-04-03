const { StatusCodes } = require("http-status-codes");

const signIn = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({ data: {} });
  } catch (error) {
    next(error);
  }
};

const signUp = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({ data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = { signIn, signUp };
