const Post = require("../models/PostSchema");
const { findById } = require("../models/UserSchema");
const User = require("../models/UserSchema");

//////////----------CREATE POST----------//////////

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

//////////----------LIKE & DISLIKE----------//////////

exports.LikeDislike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(401).json({
        status: "fail",
        message: "Post Not Found",
      });
    }

    if (post.likes.includes(req.body._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        status: "success",
        message: "Unliked",
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();

      return res.status(200).json({
        status: "success",
        message: "Liked",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};

//////////----------DELETE POST----------//////////

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!post) {
      return res.status(401).json({
        status: "fail",
        message: "Post Not Found",
      });
    }

    if (post.owner.toString() != req.user._id.toString()) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    }

    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);

    await post.remove();
    await user.save();

    res.status(200).json({
      status: "fail",
      message: "Post Deleted",
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};

//////////----------FOLLOWING'S POST----------//////////

exports.followingPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const post = await Post.find({
      owner: {
        $in: user.following,
      },
    });

    res.status(200).json({
      status: "success",
      post,
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(401).json({
        status: "fail",
        message: "Post Not Found",
      });
    }

    let Index = -1;

    post.comments.forEach((item, index) => {
      if (item.user.toString() == req.user._id.toString()) {
        Index = index;
      }
    });

    if (Index >= 0) {
      post.comments[Index].comment = req.body.message;
      await post.save();

      return res.status(200).json({
        status: "success",
        message: "Comment Modified",
      });
    } else {
      post.comments.push({
        user: req.user._id,
        comment: req.body.message,
      });
      await post.save();

      res.status(200).json({
        status: "success",
        message: "Comment Added",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};
