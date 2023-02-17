const Post = require("../models/PostSchema");

exports.createPost = async (req, res) => {
  try {
    const newPost = {
      caption: req.body.caption,
      image: {
        public_id: "public id string",
        url: "public url string",
      },
      owner: req.user._id,
    };
    const post = await Post.create(newPost);

    res.status(201).json({
      status: "success",
      post,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
