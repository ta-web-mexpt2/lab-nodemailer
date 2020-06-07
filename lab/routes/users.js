const express = require('express');
const router = express.Router();
const {sendMail} = require ("../helpers/mailer")
const { random } = require('./signup');
const User = require("../models/User")

//crear confirmation code

/* GET users listing. */
router.get('/', function(req, res) {
  res.sendMail('respond with a resource');
});
/////////////////////////////////////////

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

router.get("/confirm/:confirmationCode", (req,res)=>{
    const {confirmationCode} = req.params;
    User.findOne({ confirmationCode})
      .then(found=>{
        if (found) {
          const {_id} = found;
          User.findByAndUpdate(_id, {status:"Active"}, {new:true})
            .then(updated => {
              console.log("updated", updated);
              res.status(200).json(updated);
                })
            .catch(err => console.log("Error", err))
        }
      })
})


module.exports = router;
