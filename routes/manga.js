//Get Express
const express = require("express");
//Get Router
const router = express.Router();
const Item = require("../models/CollectionItem");
const Manga = require("../models/Manga");

const compareStrings = (s1, s2) => {
  if (!s1) return false;
  if (!s2) return false;
  return s1.toLowerCase() === s2.toLowerCase();
};

//Routeing
//Get all manga in collection
router.get("/", async (req, res) => {
  try {
    const items = await (await Item.find()).filter(
      (doc) => doc.type === "Manga"
    );
    res.json(items);
  } catch (err) {
    res.json(err);
  }
});
//Get all manga in a series by name ignores case
router.get("/:mangaName", async (req, res) => {
  try {
    const items = (await Item.find()).filter((doc) =>
      compareStrings(doc.details.name, req.params.mangaName)
    );
    res.json(items);
  } catch (err) {
    res.json(err);
  }
});
//Get all manga by a publisher
router.get("/publisher/:pubName", async (req, res) => {
  try {
    const items = (await Item.find()).filter((doc) =>
      compareStrings(doc.details.publisher, req.params.pubName)
    );
    res.json(items);
  } catch (err) {
    res.json(err);
  }
});

//add Manga
router.post("/", async (req, res) => {
  const manga = new Manga({
    name: req.body.name,
    volume: req.body.volume,
    publisher: req.body.publisher,
    author: req.body.author,
    condition: req.body.condition,
  });
  const item = new Item({ type: "Manga", details: manga });
  try {
    const savedItem = await item.save();
    res.json(savedItem);
  } catch (err) {
    res.json(err);
  }
});

//Delete manga
router.delete("/:mangaId", async (req, res) => {
  try {
    const item = await Item.remove({ _id: req.params.mangaId });
    res.json(item);
  } catch (err) {
    res.json(err);
  }
});

//update all attributes a manga
//Replaces all fields if not specified
router.put("/all/:mangaId", async (req, res) => {
  const id = req.params.mangaId;
  const newDetails = new Manga(req.body);
  const patched = await Item.findByIdAndUpdate(
    { _id: id },
    { details: newDetails },
    (err, doc) => {
      console.log(err ? `Updated Manga:\n${doc}` : err);
    }
  );
  res.json(patched);
});

module.exports = router;
