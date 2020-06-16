const express = require("express");
const router = express.Router();
const User = require("../models/User");


//Iteration 4 - Profile Routes
router.get("/:confirmCode", (req, res) => {
    const { confirmCode } = req.params;
    User.findOne({ confirmationCode: confirmCode })
        .then((user) => {
            const { username, status } = user;
            res.status(200).json({ username, status });
        })
        .catch((err) => res.status(400).json(err));
})

module.exports = router;