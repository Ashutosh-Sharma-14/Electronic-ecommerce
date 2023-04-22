const express = require('express');
const router = express.Router();

router.post('/login',async (req,res) =>{
    let LoginUser = new User({
      email: req.body.email,
      password: req.body.password
    })
  
    // find user with the given email and password
    const user = await LoginUser.findOne({email,password});
    console.log(user)
  
    if (user) {
      // User found, authentication successful
      res.send('Authentication successful');
      res.redirect("/")
    } else {
      // User not found, authentication failed
      res.send('Authentication failed');
    }
  })

  module.exports = router;