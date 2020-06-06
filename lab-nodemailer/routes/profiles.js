const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', function(req, res, next) {
    User.find().then(users => {
        console.log(users);
        proyected = users.map(user => ({ username: user.username, status: user.status }) );
        console.log(proyected);
        res.status(200).json( proyected );
    }).catch(reason => console.log("Error: ", reason));
  });

  module.exports = router;