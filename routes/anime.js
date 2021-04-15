//Get Express
const express = require("express");
//Get Router
const router = express.Router();
//Schema
const Item = require("../models/CollectionItem");
const Anime = require("../models/Anime");

//Routes
/*****************************
 *                           *
 *           Gets            *
 *                           *
 *****************************/
//
//ALL Figures
//
router.get("/", async (req, res) => {
  try {
    const items = await (await Item.find()).filter(
      (doc) => doc.type === "Anime"
    );
    res.json(items);
  } catch (err) {
    res.json(err);
  }
});

//
//A Figure by ID
//
router.get("/:AnimeId", async (req, res) => {
  try {
    const items = await Item.findById(req.params.AnimeId);
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
router.post("/", async (req, res) => {
  const figure = new Anime(req.body);
  //Formats date
  req.body.releaseDate
    ? (figure.releaseDate = new Date(figure.releaseDate)
        .toDateString()
        .substr(4))
    : {};
  const item = new Item({ type: "Anime", details: figure });
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
router.delete("/:AnimeId", async (req, res) => {
  await Item.findByIdAndDelete(req.params.AnimeId, (err, doc) => {
    if (err) res.json(err);
    res.json(doc);
  });
});

/*****************************
 *                           *
 *      Updates              *
 *                           *
 *****************************/

//
//Update all details
//
router.patch("/:AnimeId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.AnimeId },
    { $set: req.body ? { details: new Anime(req.body) } : {} },
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
router.patch("/name/:AnimeId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.AnimeId },
    { $set: req.body.name ? { "details.name": req.body.name } : {} },
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
router.patch("/publisher/:AnimeId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.AnimeId },
    {
      $set:
        req.body.publisher !== null
          ? { "details.publisher": req.body.publisher }
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
//Update Media
//
router.patch("/media/:AnimeId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.AnimeId },
    {
      $set: req.body.mediaType
        ? { "details.mediaType": req.body.mediaType }
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
//Update if is a limited edition
//
router.patch("/limitededition/:AnimeId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.AnimeId },
    {
      $set: req.body.limitedEdition
        ? { "details.limitedEdition": req.body.limitedEdition }
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
//Update release date
//Date will be stored as a string "month day year"
//
router.patch("/releasedate/:AnimeId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.AnimeId },
    {
      $set: req.body.releaseDate
        ? {
            "details.releaseDate": new Date(req.body.releaseDate)
              .toDateString()
              .substr(4),
          }
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
router.patch("/condition/:AnimeId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.AnimeId },
    {
      $set:
        req.body.condition !== null
          ? { "details.condition": req.body.condition }
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
//Update genre
//
router.patch("/genre/:AnimeId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.AnimeId },
    {
      $set: req.body.genre ? { "details.genre": req.body.genre } : {},
    },
    { new: true },
    (err, doc) => {
      if (err) res.json(err);
      res.json(doc);
    }
  );
});

module.exports = router;
