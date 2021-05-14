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
/*****************************
 *                           *
 *           Gets            *
 *                           *
 *****************************/

//
//Get all manga in collection
//
router.get("/", async (req, res) => {
  try {
    const items = await (
      await Item.find()
    ).filter((doc) => doc.type === "Manga");
    res.json(items);
  } catch (err) {
    res.json(err);
  }
});

//
//Get all manga in a series by name ignores case
//
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

//
//Get all manga by a publisher
//
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

/********************************
 *                              *
 *           Post               *
 *                              *
 *********************************/

//
//add Manga
//
router.post("/", async (req, res) => {
  const manga = new Manga(req.body.details);
  const item = new Item({
    type: "Manga",
    imgPath: req.body.imgPath,
    details: manga,
  });
  try {
    const savedItem = await item.save();
    res.json(savedItem);
  } catch (err) {
    res.json(err);
  }
});

/******************************
 *                            *
 *         Remove             *
 *                            *
 *                            *
 ******************************/

//
//Delete manga
//
router.delete("/:mangaId", async (req, res) => {
  try {
    const item = await Item.remove({ _id: req.params.mangaId });
    res.json(item);
  } catch (err) {
    res.json(err);
  }
});

/*****************************
 *                           *
 *      Updates              *
 *                           *
 *****************************/

//
//update all attributes a manga
//Replaces all fields if not specified
//
router.patch("/:MangaId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.MangaId },
    { $set: req.body.details ? { details: new Manga(req.body.details) } : {} },
    { new: true },
    (err, doc) => {
      if (err) res.json(err);
      res.json(doc);
    }
  );
});

//
//Update name
//
router.patch("/name/:MangaId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.MangaId },
    {
      $set: req.body.details.name
        ? { "details.name": req.body.details.name }
        : {},
    },
    { new: true },
    (err, doc) => {
      if (err) res.json(err);
      res.json(doc);
    }
  );
});

//
//Update publisher
//
router.patch("/publisher/:MangaId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.MangaId },
    {
      $set: req.body.details.publisher
        ? { "details.publisher": req.body.details.publisher }
        : {},
    },
    { new: true },
    (err, doc) => {
      if (err) res.json(err);
      res.json(doc);
    }
  );
});

//
//Update condition
//
router.patch("/condition/:MangaId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.MangaId },
    {
      $set: req.body.details.condition
        ? { "details.condition": req.body.details.condition }
        : {},
    },
    { new: true },
    (err, doc) => {
      if (err) res.json(err);
      res.json(doc);
    }
  );
});

//
//Update author
//
router.patch("/author/:MangaId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.MangaId },
    {
      $set: req.body.details.author
        ? { "details.author": req.body.details.author }
        : {},
    },
    { new: true },
    (err, doc) => {
      if (err) res.json(err);
      res.json(doc);
    }
  );
});

//
//Update volume number
//
router.patch("/volume/:MangaId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.MangaId },
    {
      $set: req.body.details.volume
        ? { "details.volume": req.body.details.volume }
        : {},
    },
    { new: true },
    (err, doc) => {
      res.json(err ? err : doc);
    }
  );
});

router.patch("url/:MangaId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.MangaId },
    {
      $set: req.body.imgPath ? { imgPath: req.body.imgPath } : {},
    },
    { new: true },
    (err, doc) => {
      if (err) res.json(err);
      res.json(doc);
    }
  );
});

module.exports = router;
