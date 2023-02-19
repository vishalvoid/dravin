const express = require("express");
const { createPost, LikeDislike } = require("../controllers/PostController");
const { isAuthenticated } = require("../utils/authentication");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);

router.route("/post:id").get(isAuthenticated, LikeDislike);

module.exports = router;
