const express = require('express');
const router = express.Router();

router.get("/",(req,res) => {
    console.log("File send to home page")
  res.sendFile("D:/SEM 6/ESD-ecommerce/pages/index.html");
});

router.get("/login",(req,res) => {
    console.log('currently at login page');
  res.sendFile("D:/SEM 6/ESD-ecommerce/pages/login.html");
});

router.get("/cart",(req,res) =>{
    console.log("Seeing products in the cart")
  res.sendFile("D:/SEM 6/ESD-ecommerce/pages/cart.html");
});

router.get("/register",(req,res) => {
    console.log("currently filling the registration form")
  res.sendFile("D:/SEM 6/ESD-ecommerce/pages/register.html");
});

// saving the data obtained from the registration form to the database
router.post("/register",function(req,res){
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
      })
  
      const newUser = new User({
        first_name,
        last_name,
        email,
        password: hash
      });
  
    })
    newUser.save();
    res.redirect('/')
  })

module.exports = router;