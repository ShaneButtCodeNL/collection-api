//Get Express
const express = require("express");
//Get Router
const router = express.Router();
const Item = require("../models/CollectionItem");
const Manga = require("../models/Manga");

//Routeing
//Get all items
router.get("/", async (req, res) => {
  console.log("Fetching items");
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
