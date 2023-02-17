const express = require("express");
const { createPost } = require("../controllers/PostController");

const router = express.Router();

router.route("/post/upload").post(createPost);

module.exports = router;
