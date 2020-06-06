const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { genCode } = require('../auth/signup');
const { sendMail } = require('../helpers/mailer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Sign up */
router.post('/signup', function(req, res, next) {
  const { username, password, email } = req.body;
  const confirmationCode = genCode();
  User.create({ username, password, email, confirmationCode })
  .then(created => {
    // Send mail after created
    const options = {
      email,
      username,
      confirmationURL: `http://localhost:3000/users/confirm/${confirmationCode}`,
      filename: "confirmation",
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Email confirmation",
      message: "Please confirm your email by clicking the link"
    }
    sendMail(options).then(result => {
      console.log(result);
      res.status(200).json( created );
    }).catch(reason => console.log("Couldn't send email: ", reason));
  })
  .catch(err => {
    console.log("Error: ", err);
    res.status(400).json({ err });
  })
});

/* GET users listing. */
router.get('/confirm/:confirmationCode', function(req, res, next) {
  const { confirmationCode } = req.params;
  console.log("cc: ", confirmationCode );
  User.findOne({ confirmationCode }).then(found => {
    if (found) {
      const { _id } = found;
      User.findByIdAndUpdate(_id, { status: "Active" }, { new: true })
      .then(updated => {
        console.log("Updated: ", updated);
        res.status(200).json( updated );
      }).catch(err => console.log("Error: ", err));
    }
  });
});

module.exports = router;
