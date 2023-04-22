const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/userSchema');
const routes = require('./routes/routes');

mongoose.connect("mongodb+srv://<username>:<password>@cluster0.qdfbe1e.mongodb.net/ESD-4",
{useNewUrlParser: true}, {useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',routes);
app.use('/register',routes);
app.use('/login',routes);
app.use('/cart',routes)

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
app.use('/login',routes);

// -------------------------------------------------------------------------------

app.listen(3000, function(){
  console.log("Server is running on 3000")
})

