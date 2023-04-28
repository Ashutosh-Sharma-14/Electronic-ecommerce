const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI,
{useNewUrlParser: true}, {useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));

// using the routes defined in routes/routes.js
app.use('/',routes);
app.use('/register',routes);
app.use('/login',routes);
app.use('/cart',routes);
app.use('/mobiles',routes);

// -------------------------------------------------------------------------------

app.listen(3000, function(){
  console.log("Server is running on 3000")
})

