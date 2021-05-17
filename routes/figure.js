//Get Express
const express = require("express");
//Get Router
const router = express.Router();
//Schema
const Item = require("../models/CollectionItem");
const Figure = require("../models/Figure");

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
    ).filter((doc) => doc.type === "Figure");
    res.json(items);
  } catch (err) {
    res.json(err);
  }
});

//
//ALL Figures that are not age restricted
//
router.get("/restricted", async (req, res) => {
  try {
    const items = await (
      await Item.find()
    ).filter(
      (doc) => doc.type === "Figure" && doc.details.ageRestricted === false
    );
    res.json(items);
  } catch (err) {
    res.json(err);
  }
});

//
//A Figure by ID
//
router.get("/:FigId", async (req, res) => {
  try {
    const items = await Item.findById(req.params.FigId);
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
  const figure = new Figure(req.body.details);
  const item = new Item({
    type: "Figure",
    imgPath: req.body.imgPath,
    details: figure,
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
router.delete("/:FigId", async (req, res) => {
  await Item.findByIdAndDelete(req.params.FigId, (err, doc) => {
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
router.patch("/:FigId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.FigId },
    { $set: req.body.details ? { details: new Figure(req.body.details) } : {} },
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
router.patch("/name/:FigId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.FigId },
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
//Update Type
//
router.patch("/type/:FigId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.FigId },
    {
      $set: req.body.details.type
        ? { "details.type": req.body.details.type }
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
//Update From
//
router.patch("/from/:FigId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.FigId },
    {
      $set: req.body.details.from
        ? { "details.from": req.body.details.from }
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
router.patch("/condition/:FigId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.FigId },
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

//
//Update Series
//
router.patch("/series/:FigId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.FigId },
    {
      $set:
        req.body.details.series !== null
          ? { "details.series": req.body.details.series }
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
//Update if is age restricted
//
router.patch("/agerestricted/:FigId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.FigId },
    {
      $set:
        req.body.details.ageRestricted !== undefined
          ? { "details.ageRestricted": req.body.details.ageRestricted }
          : {},
    },
    { new: true },
    (err, doc) => {
      if (err) res.json(err);
      res.json(doc);
    }
  );
});

router.patch("/imagepath/:FigId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.FigId },
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
