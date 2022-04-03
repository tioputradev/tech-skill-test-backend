require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./api/routes");
const cors = require("cors");
const { PORT, MONGO_URI } = require("./config/env");
const { default: helmet } = require("helmet");

const app = express();

// express middlewares
app.use(cors()); // for production need extensive configuration
app.use(helmet()); //for basic security purpose
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to database
mongoose
  .connect(MONGO_URI)
  .then((conn) => {
    console.log(`connected to database ${conn.connection.name}`);
  })
  .catch((err) => {
    console.error("failed when trying to connect to database");
    console.error(err);
    process.exit(1);
  });

// assign root router
app.use(router);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
