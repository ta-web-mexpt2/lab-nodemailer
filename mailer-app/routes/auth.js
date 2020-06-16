//Iteration 2 - Signup Process
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { send } = require("../helpers/mailer");


//Iteration 2 - Signup Process
router.post("/signup", (req, res) => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 20; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }

    const { username, password, confirmationCode, email } = req.body;
    bcrypt.hash(password, 10).then((hashedPassword) => {
        const user = { username, password: hashedPassword, confirmationCode: token, email };
        let options = {
            ...req.body,
            subject: "Confirm your email!",
            message1: "Confirm your email address to get started!",
            message2: `Once you've confirmed that ${req.body.email} is your email address, you can start using our site`,
            confirmationLink: `http://localhost:3000/auth/confirm/${user.confirmationCode}`
        }
        options.filename = "confirmEmail";

        User.create(user).then(() => {
            send(options)
                .then(() => {
                    res.status(200).json({ msg: "User created and confirmation mail sent" })
                })
        }).catch((err) => res.status(400).json(err));
    });
});


//Iteration 3 - Confirmation Route
router.patch("/confirm/:confirmCode", (req, res) => {
    const { confirmCode } = req.params;
    console.log(confirmCode)
    User.findOneAndUpdate({ confirmationCode: confirmCode }, { status: "Active" }, { new: true })
        .then(() => {
            res.status(200).json({ msg: "Email address has been confirmed!" });
        })
        .catch(() => res.status(400).json("There was an error verifying your email address"));
})

module.exports = router;