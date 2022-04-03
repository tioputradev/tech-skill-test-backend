const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const BadRequest = require("../../errors/bad-request");
const NotFound = require("../../errors/not-found");
const User = require("../../models/User");
const { generateToken, checkUsernameAvailable } = require("./provider");

const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      throw new NotFound("ACCOUNT_NOT_FOUND");
    }

    // compare password
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequest("INVALID_CREDENTIALS");
    }

    const token = await generateToken(user.username);

    res
      .status(StatusCodes.OK)
      .json({ data: { username: user.username, token } });
  } catch (error) {
    next(error);
  }
};

const signUp = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    // check if username available
    if (!(await checkUsernameAvailable(username))) {
      throw new BadRequest("USERNAME_EXIST");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create user
    const newUser = await User.create({
      username,
      password: hash,
      name,
    });

    // create token
    const token = await generateToken(newUser.username);

    res
      .status(StatusCodes.OK)
      .json({ data: { username: newUser.username, token } });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { username } = req.currentUser;

    res.status(StatusCodes.OK).json({ data: { username: username } });
  } catch (error) {
    next(error);
  }
};

module.exports = { signIn, signUp, getCurrentUser };
