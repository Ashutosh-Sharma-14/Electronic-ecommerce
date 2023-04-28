const express = require('express');
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require('bcrypt');

router.post('/login',async (req,res) =>{
    let LoginUser = new User({
      email: req.body.email,
      password: req.body.password
    })

    const hashedPassword = bcrypt.hash(password,10);

    // find user with the given email and password
    const user = await LoginUser.findOne({email,password});
    console.log(user)
  
    if (user.email == email && user.password == hashedPassword) {
      // User found, authentication successful
      res.send('Authentication successful');
      res.redirect("/")
    } else {
      // User not found, authentication failed
      res.send('Authentication failed');
    }
  })

  module.exports = router;