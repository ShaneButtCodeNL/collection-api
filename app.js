//Get Express
const express = require("express");
//Get mongoose
const mongoose = require("mongoose");
//get env
require("dotenv/config");

const app = express();
mongoose.set("useFindAndModify", false);

//Handle parseing body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routing
const mangaRoutes = require("./routes/manga");
const VideoGameRoutes = require("./routes/videoGame");
const FigureRoutes = require("./routes/figure");

app.use("/manga", mangaRoutes);
app.use("/videogame", VideoGameRoutes);
app.use("/figure", FigureRoutes);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connected");
  }
);

//Listen on port 3000
app.listen(3000);
