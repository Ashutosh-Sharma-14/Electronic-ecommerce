const mongoose = require('mongoose');

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
const User = mongoose.model("User",UserSchema);
module.exports = User;
