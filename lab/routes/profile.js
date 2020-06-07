const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res)=> {
    User.find()
    .then(users => {
        console.log(users);
        all = users.map(user => (
            { username: user.username, status: user.status }) );
        console.log(all)
        res.status(200).json( all );})
    .catch(why => console.log("Error: ", why));
  });

  module.exports = router; 