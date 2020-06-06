const express = require('express');
const router = express.Router();
const User = require("../models/User");

/* GET user profile. */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      const { username, status } = user;

      res.status(200).json({username, status});
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
