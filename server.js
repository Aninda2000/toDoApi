const express = require("express");
const app = express();
const port = 8000;
const dotenv = require("dotenv").config();
const db = require("./config/mongoose");
const passport = require("passport");
const passportJwt = require("./config/passport-jwt-stregedy");



app.use(express.urlencoded());
app.use(express.static("./assets"));


app.use("/", require("./routes"));
app.use(passport.initialize());

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
