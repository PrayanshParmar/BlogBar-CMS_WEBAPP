const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  profile_img_url: {
    type: String,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
 
},{timestamps: true});

const User = model("user", userSchema);

module.exports = User;
