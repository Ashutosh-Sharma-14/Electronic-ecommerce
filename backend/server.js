const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ashutosh:ashutosh@cluster0.qdfbe1e.mongodb.net/ESD-4",
{useNewUrlParser: true}, {useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));

// creating user schema
const UserSchema = {
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type:String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
};

const loginSchema = {
  email: {
    type:String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
};

const LoginUser = mongoose.model('LoginUser',loginSchema);
const User = mongoose.model("",UserSchema);
// ---------------------------------------------------------------------------------

app.use(express.static('public'));
app.get("/",function(req,res){
  res.sendFile("D:/SEM 6/ESD-ecommerce/pages/index.html")
})

app.get("/login",function(req,res){
  res.sendFile("D:/SEM 6/ESD-ecommerce/pages/login.html")
})

app.get("/cart",function(req,res){
  res.sendFile("D:/SEM 6/ESD-ecommerce/pages/cart.html")
})

app.get("/register",function(req,res){
  res.sendFile("D:/SEM 6/ESD-ecommerce/pages/register.html");
})

// ---------------------------------------------------------------------------------

app.post("/register",function(req,res){
  let newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save();
  res.redirect('/')
})
// ------------------------------------------------------------------------------------

// user authentication
app.post('/login',async (req,res) =>{
  let LoginUser = new User({
    email: req.body.email,
    password: req.body.password
  })

  // find user with the given email and password
  const user = await User.findOne({email,password});

  if (user) {
    // User found, authentication successful
    res.send('Authentication successful');
    res.redirect("/")
  } else {
    // User not found, authentication failed
    res.send('Authentication failed');
  }
})

// -------------------------------------------------------------------------------

app.listen(3000, function(){
  console.log("Server is running on 3000")
})

