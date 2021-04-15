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
    const items = await (await Item.find()).filter(
      (doc) => doc.type === "Figure"
    );
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
    const items = await (await Item.find()).filter(
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
  const figure = new Figure(req.body);
  const item = new Item({ type: "Figure", details: figure });
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
    { $set: req.body ? { details: new Figure(req.body) } : {} },
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
    { $set: req.body.name ? { "details.name": req.body.name } : {} },
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
//Update if is sealed
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

//
//Update Series
//
router.patch("/series/:FigId", async (req, res) => {
  await Item.findOneAndUpdate(
    { _id: req.params.FigId },
    {
      $set:
        req.body.series !== null ? { "details.series": req.body.series } : {},
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
        req.body.ageRestricted !== null
          ? { "details.ageRestricted": req.body.ageRestricted }
          : {},
    },
    { new: true },
    (err, doc) => {
      if (err) res.json(err);
      res.json(doc);
    }
  );
});

module.exports = router;
