const express = require("express");
const {
  register,
  login,
  follow,
  logout,
  updatePassword,
  updateprofile,
  MyProfile,
  deleteProfile,
} = require("../controllers/UserController");
const { isAuthenticated } = require("../utils/authentication");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/follow/:id").get(isAuthenticated, follow);
router.route("/logout").get(isAuthenticated, logout);
router.route("/update/password").post(isAuthenticated, updatePassword);
router.route("/update/profile").patch(isAuthenticated, updateprofile);
router.route("/my/profile").get(isAuthenticated, MyProfile);
router.route("/delete/profile").delete(isAuthenticated, deleteProfile);

module.exports = router;
