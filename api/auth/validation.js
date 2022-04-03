const { body } = require("express-validator");

const signInValidation = [
  body("username").isString().withMessage("username must be a string"),
  body("password")
    .isString()
    .withMessage("password must be a string")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 character"),
];

const signUpValidation = [
  body("username").isString().withMessage("username must be a string"),
  body("name").isString().withMessage("name must be a string"),
  body("password")
    .isString()
    .withMessage("password must be a string")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 character"),
];

module.exports = { signInValidation, signUpValidation };
