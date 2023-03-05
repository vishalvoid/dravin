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
} = require("../controllers/UserController");
const { isAuthenticated } = require("../utils/authentication");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/follow/:id").get(isAuthenticated, follow);
router.route("/logout").get(isAuthenticated, logout);
router.route("/update/password").post(isAuthenticated, updatePassword);
router.route("/update/profile").patch(isAuthenticated, updateprofile);
router.route("/delete/profile").delete(isAuthenticated, deleteProfile);
router.route("/me").get(isAuthenticated, getMyProfile);
router.route("/user/:id").get(getUserProrfile);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/my/posts").get(isAuthenticated, getMyPosts);

module.exports = router;
