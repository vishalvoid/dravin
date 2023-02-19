const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");

const jwttoken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please Enter a Password",
      });
    }

    const check_email = await User.findOne({ email }).select("+password");
    if (!check_email) {
      return res.status(400).json({
        status: "fail",
        message: `${email} is not registered with us. Register Now!`,
      });
    }

    const isMatched = await check_email.match_password(password);
    if (!isMatched) {
      return res.status(400).json({
        status: "fail",
        message: "incorrect Credentials",
      });
    }

    const token = await jwttoken(check_email._id);
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      status: "success",
      message: check_email.name,
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
