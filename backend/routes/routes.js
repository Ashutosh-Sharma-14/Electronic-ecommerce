const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');

router.get("/",(req,res) => {
    console.log("File send to home page")
  res.sendFile("D:/SEM 6/ESD-ecommerce/pages/index.html");
});

router.get("/login",(req,res) => {
    console.log('currently at login page');
  res.sendFile("D:/SEM 6/ESD-ecommerce/pages/login/login.html");
});

router.get("/cart",(req,res) =>{
    console.log("Seeing products in the cart")
  res.sendFile("D:/SEM 6/ESD-ecommerce/pages/cart.html");
});

router.get("/mobiles",(req,res) =>{
  console.log("Mobiles to buy")
res.sendFile("D:/SEM 6/ESD-ecommerce/pages/mobiles.html");
});

router.get("/register",(req,res) => {
    console.log("currently filling the registration form")
  res.sendFile("D:/SEM 6/ESD-ecommerce/pages/register.html");
});

// saving the data obtained from the registration form to the database
router.post("/register",(req,res) => {
    const {first_name, last_name, email, password} = req.body;
  
    // generating the salt for encryption
    bcrypt.genSalt(10, (err,salt) => {
      if (err){
        console.log(err);
        res.status(500).send('Internal server error');
        return;
      }
    
      // hashing the password using generated salt
      bcrypt.hash(password, salt, (err,hash) =>{
        if(err){
          console.error(err);
          res.status(500).send('Internal server error');
          return;
        }

        let newUser = new User({
            first_name,
            last_name,
            email,
            password:hash
          });
    
        newUser.save();
        res.redirect('/login');
        
      })
    })
  })

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
      res.redirect("/home")
    } else {
      // User not found, authentication failed
      res.send('Authentication failed');
    }
  })

module.exports = router;