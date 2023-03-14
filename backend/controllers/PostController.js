const { populate } = require("../models/PostSchema");
const Post = require("../models/PostSchema");
const { findById } = require("../models/UserSchema");
const User = require("../models/UserSchema");
const cloudinary = require("cloudinary");

//////////----------CREATE POST----------//////////

exports.createPost = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "posts",
    });

    const newPost = {
      caption: req.body.caption,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    };

    const post = await Post.create(newPost);

    const user = await User.findById(req.user._id);

    user.posts.unshift(post._id);

    await user.save();

    res.status(201).json({
      status: "success",
      message: "Post Created",
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
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
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

    await cloudinary.v2.uploader.destroy(post.image.public_id);

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

    let posts = await Post.find({
      owner: {
        $in: user.following,
      },
    }).populate("owner likes comments.user");

    res.status(200).json({
      status: "success",
      posts: posts.reverse(),
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
    console.log(post);

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
