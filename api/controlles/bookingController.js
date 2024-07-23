import Booking from "../models/bookingModel.js";

export const getAllBookings = async function (req, res) {
  const booking = await Booking.find();
  res.status(200).json({
    status: "success",
    data: {
      result: booking.length,
      booking,
    },
  });
};
