const { JWT_SECRET } = require("../config/env");
const JWT = require("jsonwebtoken");
const Unauthorized = require("../errors/unauthorize");

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) throw new Unauthorized("UNAUTHORIZED");

    let jwtPayload = JWT.verify(token, JWT_SECRET);

    if (!jwtPayload) throw new Unauthorized("UNAUTHORIZED");

    req.currentUser = jwtPayload;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
