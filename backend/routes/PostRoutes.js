const express = require("express");
const {
  createPost,
  LikeDislike,
  deletePost,
  followingPost,
} = require("../controllers/PostController");

const { isAuthenticated } = require("../utils/authentication");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);

router
  .route("/post/:id")
  .get(isAuthenticated, LikeDislike)
  .delete(isAuthenticated, deletePost);

router.route("/following").get(isAuthenticated, followingPost);



module.exports = router;
