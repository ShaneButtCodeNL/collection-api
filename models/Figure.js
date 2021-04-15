const mongoose = require("mongoose");

const FigureScheme = mongoose.Schema(
  {
    name: { type: String, required: true },
    condition: String,
    //What work the statue is from
    from: String,
    //Is figure 18+
    ageRestricted: Boolean,
    //Type of figure
    type: String,
    //Is Sealed
    sealed: Boolean,
    //Is from a series
    series: String,
  },
  { _id: false }
);

module.exports = mongoose.model("Figure", FigureScheme);
