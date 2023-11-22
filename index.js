const express = require("express");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const ConnectDB = require("./config/db");
const app = express();
require("dotenv").config();
const port = process.env.APP_PORT;
const apiRoutes = require("./routes/api");
const bodyParser = require("body-parser");
var cors = require("cors");

app.use(cors());

app.use(express.json());
// app.use(express.urlencoded({ extended: true}))
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/api/${process.env.API_VERSION}`, apiRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

process.on("uncaughtException", function (err) {
  console.log(err);
});

app.listen(port, () => {
  ConnectDB();
  console.log(`App listening on port ${port}`);
});
