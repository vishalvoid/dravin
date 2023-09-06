const express = require("express");
const { isAuthenticated } = require("../utils/authentication");
const {
  sendMessageController,
  fetchAllMessage,
} = require("../controllers/MessageController");

const router = express.Router();

router.route("/send/message").post(isAuthenticated, sendMessageController);
router.route("/fetchmessage/:chatId").get(isAuthenticated, fetchAllMessage);

module.exports = router;
