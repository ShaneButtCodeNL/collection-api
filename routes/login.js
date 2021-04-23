//Get Express
const express = require("express");
//Get Router
const router = express.Router();
//Schema
const User = require("../models/Owner");

/**
 * Basic login request needs encryption if going to launch on public servers
 * Sends a json object {success : booleanValue} depending if login successful
 */
router.get("/", async (req, res) => {
  try {
    const login = await User.findOne({
      userName: req.query.userName,
      password: req.query.password,
    });
    if (!login) {
      console.log("Failed Login attempt.");
      res.json({ success: false });
    } else {
      console.log("User found.");
      //Current date
      const currentDate = new Date(Date.now());
      //Updates date of last access to document
      await User.findOneAndUpdate(
        { _id: login._id },
        {
          $set: {
            lastAccess: new Date(
              Date.UTC(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate(),
                currentDate.getHours(),
                currentDate.getMinutes()
              )
            ),
          },
        }
      );
      res.json({ success: true });
    }
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
