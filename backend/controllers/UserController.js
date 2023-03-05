const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const Post = require("../models/PostSchema");

const jwttoken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

//////////----------REGISTER----------//////////

exports.register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    // to check if email already exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        status: "fail",
        message: "user already Exists",
      });
    }

    const data = await User.create({
      name,
      email,
      password,
      avatar: { public_id: "default public id", url: "default link url" },
    });

    const token = await jwttoken(data._id);
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(201)
      .cookie("token", token, options)
      .json({
        status: "success",
        message: `Welcome ${name}, Registration Successfull`,
        token,
      });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

//////////----------LOGIN----------//////////

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please Enter a Password",
      });
    }

    const user = await User.findOne({ email })
      .select("+password")
      .populate("following followers");
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: `${email} is not registered with us. Register Now!`,
      });
    }

    const isMatched = await user.match_password(password);
    if (!isMatched) {
      return res.status(400).json({
        status: "fail",
        message: "incorrect Credentials",
      });
    }

    const token = await jwttoken(user._id);
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({
        status: "success",
        user,
        message: `welcome ${user.name}`,
      });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

//////////----------LOGOUT----------//////////

exports.logout = async (req, res) => {
  try {
    const options = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };

    res.status(200).cookie("token", null, options).json({
      status: "success",
      message: "Logged Out Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

//////////----------FOLLOW & UNFOLLOW----------//////////

exports.follow = async (req, res) => {
  try {
    const usertoFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!usertoFollow) {
      return res.status(400).json({
        status: "fail",
        message: "User Not Found",
      });
    }

    if (loggedInUser.following.includes(req.params.id)) {
      const index = loggedInUser.following.indexOf(req.params.id);
      loggedInUser.following.splice(index, 1);
      const index2 = usertoFollow.followers.indexOf(req.user._id);
      usertoFollow.followers.splice(index2, 1);

      await loggedInUser.save();
      await usertoFollow.save();

      return res.status(200).json({
        status: "success",
        message: "Unfollowed",
      });
    } else {
      loggedInUser.following.push(req.params.id);
      usertoFollow.followers.push(req.user._id);

      await loggedInUser.save();
      await usertoFollow.save();

      return res.status(200).json({
        status: "success",
        message: "followed",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

//////////----------UPDATE PASSWORD----------//////////

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Current Password or Password cannot be blank",
      });
    }

    const correctpassword = await user.match_password(currentPassword);

    if (correctpassword) {
      user.password = newPassword;
      await user.save();

      res.status(200).json({
        status: "success",
        message: "Password Updated Succesfully",
      });
    } else {
      res.status(200).json({
        status: "fail",
        message: "Incorrect Old Password",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: error.message,
    });
  }
};

//////////----------UPDATE PROFILE----------//////////

exports.updateprofile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id);

    if (email == user.email) {
      return res.status(200).json({
        status: "fail",
        message: "Email cannot be same as previous",
      });
    }

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: error.message,
    });
  }
};

//////////----------DELETE PROFILE----------//////////

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;

    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await post.remove();
    }

    // removing users from followers and following
    const following = user.following;
    const follower = user.followers;

    for (let i = 0; i < follower.length; i++) {
      const follow = await User.findById(follower[i]);
      const index = follow.following.indexOf(user._id);
      follow.following.splice(index, 1);
      await follow.save();
    }

    for (let i = 0; i < following.length; i++) {
      const follow = await User.findById(following[i]);
      const index = follow.followers.indexOf(user._id);
      follow.followers.splice(index, 1);
      await follow.save();
    }

    await user.remove();

    const options = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };

    res.status(200).cookie("token", null, options).json({
      status: "success",
      message: "profile Deleted Successfully",
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: error.message,
    });
  }
};

//////////----------GET PROFILE----------//////////

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "posts followers following"
    );

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getUserProrfile = async (req, res) => {
  try {
    const profile = await User.findById(req.params.id).populate("posts");
    if (!profile) {
      return res.status(400).json({
        status: "fail",
        message: "profile Not Found",
      });
    }
    res.status(200).json({
      status: "success",
      message: profile,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      status: "success",
      users: users.reverse(),
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
