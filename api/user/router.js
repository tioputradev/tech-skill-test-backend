const router = require("express").Router();
const { signIn, signUp } = require("./controller");

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

module.exports = router;
