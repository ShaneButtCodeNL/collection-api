//Get Express
const express = require("express");
//Get mongoose
const mongoose = require("mongoose");
//get env
require("dotenv/config");
//get cors
const cors = require("cors");

const app = express();
mongoose.set("useFindAndModify", false);

//Handle parseing body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routing
const itemRoutes = require("./routes/items");
const mangaRoutes = require("./routes/manga");
const VideoGameRoutes = require("./routes/videoGame");
const FigureRoutes = require("./routes/figure");
const AnimeRoutes = require("./routes/anime");
const LoginRoutes = require("./routes/login");
app.use(cors());
app.use("/", itemRoutes);
app.use("/manga", mangaRoutes);
app.use("/videogame", VideoGameRoutes);
app.use("/figure", FigureRoutes);
app.use("/anime", AnimeRoutes);
app.use("/login", LoginRoutes);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connected");
  }
);

//Listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on Port:${process.env.PORT || 3000}`);
});
