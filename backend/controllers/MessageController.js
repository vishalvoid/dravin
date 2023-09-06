const Chat = require("../models/ChatSchema");
const Message = require("../models/MessageSchema");
const User = require("../models/UserSchema");

exports.sendMessageController = async (req, res, next) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      return res.status(400).json({
        status: "fail",
        message: "invalid data passed",
      });
    }

    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    try {
      var message = await Message.create(newMessage);

      message = await message.populate("sender", "name avatar");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "Chat.users",
        select: "name avatar email",
      });

      await Chat.findByIdAndUpdate(req.body.chatId, {
        latestMessage: message,
      });

      res.status(200).json({ status: "success", message: message });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.fetchAllMessage = async (req, res, next) => {
  try {
    var message = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name avatar email")
      .populate("chat");

    res.status(200).json({
      status: "success",
      message: message,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
