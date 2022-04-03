const User = require("../../models/User");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/env");

const checkUsernameAvailable = async (username) => {
  const user = await User.findOne({ username }).select("username");

  if (user) {
    return false;
  } else {
    return true;
  }
};

const generateToken = async (username) => {
  // create token
  const token = JWT.sign({ username: username }, JWT_SECRET);

  return token;
};

module.exports = { checkUsernameAvailable, generateToken };
