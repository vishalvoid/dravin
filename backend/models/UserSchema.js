const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a Valid Name."],
  },
  email: {
    type: email,
    required: [true, "please Enter a Password"],
    unique: [true, "email already exists"],
  },
  avatar: {
    public_id: String,
    url: String,
  },
  password: {
    type: String,
    required: [true, "Please Enter a Password"],
    minlength: [6, "Password Must be at least 6 Characters"],
    select: false,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.Schema("User", userSchema);
