const Chat = require("../models/ChatSchema");
const User = require("../models/UserSchema");

exports.accessChat = async (req, res, next) => {
  try {
    const { userID } = req.body;

    if (!userID) {
      return res.status(400).json({
        status: "fail",
        message: "User Not Found",
      });
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userID } } },
      ],
    })
      .populate("users")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name",
    });

    const chatbox = await isChat[0];

    if (isChat.length > 0) {
      res.status(200).json({ status: "success", chatbox });
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userID],
      };

      try {
        const createdChat = await Chat.create(chatData);
        const chatbox = await Chat.findOne({ _id: createdChat._id }).populate(
          "users"
        );

        res.status(200).json({ status: "success", chatbox });
      } catch (error) {
        res.status(400).json({
          status: "fail",
          message: error.message,
        });
      }
    }
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.fetchChat = async (req, res, next) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users")
      .populate("groupAdmin")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name",
        });

        res.status(200).json({
          status: "success",
          message: results,
        });
      });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
