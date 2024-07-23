import express from "express";
import { getAllBookings } from "../controlles/bookingController.js";

const router = express.Router();
router.route("/").get(getAllBookings);

export default router;
