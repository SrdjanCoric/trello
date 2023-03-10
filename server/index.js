const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const HttpError = require("./models/httpError");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "../client", "build")));
// app.use(express.static("public"));
const port = process.env.PORT || 5001;

mongoose.set("useFindAndModify", false);

mongoose
  .connect("mongodb://164.92.132.26:27017/reaction")
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api", routes);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({ error: err.message || "An unknown error occured" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
