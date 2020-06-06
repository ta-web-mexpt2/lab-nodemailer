const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Signup the user
router.post("/signup", (req, res) => {
    // destructure the body
    const {username, email, password } = req.body;

    // Create random token
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';

    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }
  
    // use bcrypt to hash the password 10 time
    bcrypt.hash(password, 10).then((hashPassword) => {
      // define user object
      const user = { username, email, password: hashPassword, confirmationCode: token };
  
      // create user using the defined object
      User.create(user)
        .then(() => {
          res.status(201).json({ message: "User succesfully created" });
        })
        .catch((err) => res.status(400).json(err));
    });
  });

  module.exports = router;