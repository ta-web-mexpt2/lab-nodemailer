const express = require('express');
const router = express.Router();
const {sendMail} = require ("../helpers/mailer")
const User = require("../models/User")
const { random } = require('./signup');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Sign up
router.post("/signup", (req,res)=> {
  const {username, password, email} = req.body;
  const confirmationCode = random();

  User.create({ username, password, email, confirmationCode})
    .then( (created)=>{ 
          const options = {
            email, 
            username,
            confirmURL: `http://localhost:3000/users/confirm/${confirmationCode}`,
            filename: "action",
            from: process.env.MAIL_USER,
            to: email,
            subject: "Confirm your email",
            message: "Confirm your mail to be happy!"
          }

          sendMail(options)
            .then( result=>{console.log(result)
                  res.status(200).json( created ) })
                  
            .catch( (why) => console.log ("Could not send email", why));
                          })

    .catch( err=>{ console.log("Error", err);
     res.status(400).json({err})
  }) 
})

module.exports = router;
