const mongoose = require("mongoose");

const AnimeScheme = mongoose.Schema(
  {
    name: { type: String, required: true },
    //Type of media such as VHS, DVD, BluRay,Digital ect
    mediaType: { type: String, required: true },
    publisher: String,
    condition: String,
    releaseDate: Date,
    //Genres of the anime such as shonen, magic, ecchi, horror ect
    genres: { type: Array, required: true },
    limitedEdition: Boolean,
  },
  { _id: false }
);

module.exports = mongoose.model("Anime", AnimeScheme);
