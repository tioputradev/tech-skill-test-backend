const router = require("express").Router();
const { StatusCodes } = require("http-status-codes");
const errorHandler = require("../middlewares/error-handler");
const userRouter = require("./user/router");

router.use("/users", userRouter);

// handle error thrown by api
router.use(errorHandler);

// handle route not found
router.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: "route not found" });
});

module.exports = router;
