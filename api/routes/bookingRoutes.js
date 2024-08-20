import express from "express";
import {
  CheckinBooking,
  CheckoutBooking,
  dashboardState,
  deleteBookings,
  getAllBookings,
  getBookingById,
} from "../controlles/bookingController.js";

const router = express.Router();
router.route("/").get(getAllBookings);
router.route("/checkin/:id").put(CheckinBooking);
router.route("/dashboard").get(dashboardState);
router.route("/checkout/:id").put(CheckoutBooking);
router.route("/:id").get(getBookingById).delete(deleteBookings);
export default router;
