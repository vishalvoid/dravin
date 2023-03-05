const express = require("express");
const {
  createPost,
  LikeDislike,
  deletePost,
  followingPost,
  addComment,
} = require("../controllers/PostController");

const { isAuthenticated } = require("../utils/authentication");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);

router
  .route("/post/:id")
  .get(isAuthenticated, LikeDislike)
  .delete(isAuthenticated, deletePost);

router.route("/posts").get(isAuthenticated, followingPost);
router.route("/post/comment/:id").put(isAuthenticated, addComment);

module.exports = router;
