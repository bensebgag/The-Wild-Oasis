import express from "express";
import { setting } from "../controlles/settingContoller.js";
const router = express.Router();
router.route("/update").post(setting);
export default router;
