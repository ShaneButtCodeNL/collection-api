const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  type: { type: String, required: true },
  imgPath: { type: URL, required: true },
  details: { type: Object, required: true },
});

module.exports = mongoose.model("CollectionItem", ItemSchema);
