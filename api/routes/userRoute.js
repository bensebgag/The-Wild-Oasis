import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  protect,
  register,
} from "../controlles/authController.js";
import { createUser, getuser } from "../controlles/userController.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/isAuthenticated", isAuthenticated);
router.post("/createUser", createUser);
router.route("/currentUser").get(protect, getuser);
export default router;
