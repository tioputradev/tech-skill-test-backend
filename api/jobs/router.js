const router = require("express").Router();
const authentication = require("../../middlewares/authentication");
const { getAllJobs, getJobDetail } = require("./controller");

router.get("/", authentication, getAllJobs);

router.get("/:id", authentication, getJobDetail);

module.exports = router;
