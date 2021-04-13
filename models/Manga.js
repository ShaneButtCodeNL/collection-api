const mongoose = require("mongoose");

const MangaScheme = mongoose.Schema(
  {
    name: { type: String, required: true },
    volume: { type: Number, default: 0 },
    publisher: String,
    author: String,
    condition: String,
  },
  { _id: false }
);

module.exports = mongoose.model("Manga", MangaScheme);
