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
    const items = await (
      await Item.find()
    ).filter((doc) => doc.type === "Anime");
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
  const anime = new Anime(req.body.details);
  //Formats date
  req.body.releaseDate
    ? (anime.releaseDate = new Date(anime.releaseDate).toDateString().substr(4))
    : {};
  const item = new Item({
    type: "Anime",
    imgPath: req.body.imgPath,
    details: anime,
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
    { $set: req.body.details ? { details: new Anime(req.body.details) } : {} },
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
router.patch("/publisher/:AnimeId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.AnimeId },
    {
      $set:
        req.body.details.publisher !== null
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
//Update Media
//
router.patch("/media/:AnimeId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.AnimeId },
    {
      $set: req.body.details.mediaType
        ? { "details.mediaType": req.body.details.mediaType }
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
      $set:
        req.body.details.limitedEdition !== undefined
          ? { "details.limitedEdition": req.body.details.limitedEdition }
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
      $set: req.body.details.releaseDate
        ? {
            "details.releaseDate": new Date(req.body.details.releaseDate)
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
        req.body.details.condition !== null
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
//Update genre
//
router.patch("/genres/:AnimeId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.AnimeId },
    {
      $set: req.body.details.genres
        ? { "details.genres": req.body.details.genres }
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
//Update image url
//
router.patch("url/:AnimeId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.AnimeId },
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
