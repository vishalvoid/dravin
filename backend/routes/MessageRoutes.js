const express = require("express");
const { isAuthenticated } = require("../utils/authentication");
const { accessChat, fetchChat } = require("../controllers/ChatController");

const router = express.Router();

router.route("/chatbox").post(isAuthenticated, accessChat);
router.route("/chatbox").post(isAuthenticated, fetchChat);


module.exports = router;
