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
  const VG = new VideoGame(req.body.details);
  const item = new Item({
    type: "VideoGame",
    imgPath: req.body.imgPath,
    details: VG,
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
    {
      $set: req.body.details
        ? { details: new VideoGame(req.body.details) }
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
//Update name
//
router.patch("/name/:VGId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.VGId },
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
//Update platform
//
router.patch("/platform/:VGId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.VGId },
    {
      $set: req.body.details.platform
        ? { "details.platform": req.body.details.platform }
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
router.patch("/condition/:VGId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.VGId },
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
//Update release date
//Date will be stored as a string "month day year"
//
router.patch("/releasedate/:VGId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.VGId },
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
//Update genre
//
router.patch("/genre/:VGId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.VGId },
    {
      $set: req.body.details.genre
        ? { "details.genre": req.body.details.genre }
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
//Update if is sealed
//
router.patch("/sealed/:VGId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.VGId },
    {
      $set:
        req.body.details.sealed !== null
          ? { "details.sealed": req.body.details.sealed }
          : {},
    },
    { new: true },
    (err, doc) => {
      if (err) res.json(err);
      res.json(doc);
    }
  );
});

router.patch("url/:VGId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.VGId },
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
