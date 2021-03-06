const mongoose = require("mongoose");

const VideoGameScheme = mongoose.Schema(
  {
    name: { type: String, required: true },
    platform: { type: String, required: true },
    publisher: String,
    condition: String,
    releaseDate: String,
    //Genres of the game such as RPG, Adventure, Fighting ect
    genres: { type: Array, required: true },
    //Is sealed
    sealed: Boolean,
    //Has case for game
    hasCase: { type: Boolean, default: true },
  },
  { _id: false }
);

module.exports = mongoose.model("VideoGame", VideoGameScheme);
