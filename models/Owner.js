const mongoose = require("mongoose");

const OwnerSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, requires: true },
    lastAccess: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", OwnerSchema);
