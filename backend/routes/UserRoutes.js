const express = require("express");
const {
  register,
  login,
  follow,
  logout,
  updatePassword,
  updateprofile,
  getMyProfile,
  deleteProfile,
  getUserProrfile,
  getAllUsers,
  getMyPosts,
  getUserPosts,
} = require("../controllers/UserController");
const { isAuthenticated } = require("../utils/authentication");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/follow/:id").get(isAuthenticated, follow);
router.route("/logout").post(isAuthenticated, logout);
router.route("/update/password").post(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateprofile);
router.route("/delete/profile").delete(isAuthenticated, deleteProfile);
router.route("/me").get(isAuthenticated, getMyProfile);
router.route("/user/:id").get(getUserProrfile);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/my/posts").get(isAuthenticated, getMyPosts);
router.route("/userposts/:id").get(isAuthenticated, getUserPosts);

module.exports = router;
