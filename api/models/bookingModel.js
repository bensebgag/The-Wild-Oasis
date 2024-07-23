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
    type: Number,
    required: true,
  },
  cabinRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cabin",
  },
  guestId: {
    type: Number,
    required: true,
  },
  guestRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
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
