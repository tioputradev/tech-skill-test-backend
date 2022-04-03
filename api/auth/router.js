const router = require("express").Router();
const authentication = require("../../middlewares/authentication");
const { validateRequest } = require("../../middlewares/validate-request");
const { signIn, signUp, getCurrentUser } = require("./controller");
const { signInValidation, signUpValidation } = require("./validation");

router.post("/sign-in", signInValidation, validateRequest, signIn);

router.post("/sign-up", signUpValidation, validateRequest, signUp);

router.get("/current-user", authentication, getCurrentUser);

module.exports = router;
