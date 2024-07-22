import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  cabinId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cabin",
    required: true,
  },
  guestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
    required: true,
  },
  hasBreakfast: {
    type: Boolean,
    required: true,
  },
  observations: {
    type: String,
    default: "",
  },
  isPaid: {
    type: Boolean,
    required: true,
  },
  numGuests: {
    type: Number,
    required: true,
    min: 1,
  },
});

// Create the model from the schema and export it
const Booking = mongoose.model("bookings", bookingSchema);

export default Booking;
