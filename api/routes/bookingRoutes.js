import express from "express";

const router = express.Router();
router.route("/").get(getAllBookings);

export default router;
