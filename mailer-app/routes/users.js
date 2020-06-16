var express = require('express');
var router = express.Router();
const User = require("../models/User");

// GET users
router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json({
        result: users,
      });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
