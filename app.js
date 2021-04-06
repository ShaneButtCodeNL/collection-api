//Get Express
const express = require("express");
//Get mongoose
const mongoose = require("mongoose");
//get env
require("dotenv/config");

const app = express();

//Handle parseing body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routing
app.get("/", (req, res) => {
  res.send("We are at home");
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connected");
  }
);

//Listen on port 3000
app.listen(3000);
