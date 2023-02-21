const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not Logged In, Kindly Login First.",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
