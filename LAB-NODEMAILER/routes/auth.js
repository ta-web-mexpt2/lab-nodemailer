const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const {loginProcess} = require('../controllers/auth.controllers')



router.post("/login", loginProcess);



router.post("/signup", (req, res, next) => {
  const {username, password, email} = req.body;
  if (username === "" || password === "") {
    res.status(400).json({ message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let token = "";
    for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length)];
    }

    const newUser = new User({
      username,
      password: hashPass,
      email,
      confirmationCode: token
    });

    newUser
      .save()
      .then(() => {
         transporter.sendMail({
            from: '"Confirm your email " <r.margain.gonzalez@gmail.com>',
            to: email,
            subject: "Confirm your email",
            html: `<b>click this link to confirm: <a href="http://localhost:3000/auth/confirm/${token}"> click here </a>  </b>`,
          });
        })
      .then(() => {
        res.status(200).json({message: 'confirmation email sent'});
      })
      .catch((err) => {
        res.status(400).json({ message: "Something went wrong" });
      })

  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.post("/confirm/:confirmCode", (req, res) => {
  const {confirmCode} = req.params
  User.findOneAndUpdate({confirmationCode: confirmCode}, {status: 'Active'}, {new:true})
  .then(()=> res.status(200).json({message: "activation success"}))
  .catch((err) => res.status(400).json({message: 'something went wrong'}))

})
module.exports = router;
