const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  // for caption
  caption: String,
  // image link using cloudnary
  image: {
    public_id: String,
    url: String,
  },
  // post owner information
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // time at which post is created.
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // number of likes the post has.
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // // comments the post has.
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
