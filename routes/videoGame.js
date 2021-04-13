//Get Express
const express = require("express");
//Get Router
const router = express.Router();
const Item = require("../models/CollectionItem");
const VG = require("../models/VideoGame");

//Routes
router.get("/", async (req, res) => {
  try {
    const items = await (await Item.find()).filter(
      (doc) => doc.type === "VideoGame"
    );
    res.json(items);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
