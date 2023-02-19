const Post = require("../models/PostSchema");
const User = require("../models/UserSchema");

exports.createPost = async (req, res) => {
  try {
    console.log(req.user);
    const newPost = {
      caption: req.body.caption,
      image: {
        public_id: "public id string",
        url: "public url string",
      },
      owner: req.user._id,
    };

    const post = await Post.create(newPost);

    const user = await User.findById(req.user._id);

    user.posts.push(post._id);

    await user.save();

    res.status(201).json({
      status: "success",
      post,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.LikeDislike = async (req, res) => {
  try {
    const postID = req.params.id;
  } catch (error) {}
};
