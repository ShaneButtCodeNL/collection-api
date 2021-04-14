//Get Express
const express = require("express");
//Get Router
const router = express.Router();
const Item = require("../models/CollectionItem");
const VideoGame = require("../models/VideoGame");

//Routes
/*****************************
 *                           *
 *           Gets            *
 *                           *
 *****************************/
//
//ALL Video Games
//
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

//
//A VideoGame by ID
//
router.get("/:VGId", async (req, res) => {
  try {
    const items = await Item.findById(req.params.VGId);
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
  const VG = new VideoGame(req.body);
  const item = new Item({ type: "VideoGame", details: VG });
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

router.delete("/:VGId", async (req, res) => {
  await Item.findByIdAndDelete(req.params.VGId, (err, doc) => {
    if (err) res.json(err);
    res.json(doc);
  });
});

/*****************************
 *      Updates              *
 *****************************/

//
//Update all details
//
router.patch("/:VGId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.VGId },
    { $set: { details: req.body } },
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
router.patch("/name/:VGId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.VGId },
    { $set: req.body.name ? { "details.name": req.body.name } : {} },
    { new: true },
    (err, doc) => {
      if (err) res.json(err);
      res.json(doc);
    }
  );
});

//
//Update platform
//
router.patch("/platform/:VGId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.VGId },
    {
      $set: req.body.platform ? { "details.platform": req.body.platform } : {},
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
router.patch("/condition/:VGId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.VGId },
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
//Update release date
//
/*********************************
 * TODO:
 * fix so it doesnt show time
 **********************************/
router.patch("/releasedate/:VGId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.VGId },
    {
      $set: req.body.releaseDate
        ? { "details.releaseDate": new Date(req.body.releaseDate) }
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
router.patch("/genre/:VGId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.VGId },
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

//
//Update genre
//
router.patch("/sealed/:VGId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.VGId },
    {
      $set:
        req.body.sealed !== null ? { "details.sealed": req.body.sealed } : {},
    },
    { new: true },
    (err, doc) => {
      if (err) res.json(err);
      res.json(doc);
    }
  );
});

module.exports = router;
