import mongoose from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
/*  */ const bookingSchema = new mongoose.Schema(
  {
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
      ref: "cabines",
    },
    guestId: {
      type: Number,
      required: true,
    },
    guestRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "guestes",
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
    status: String,
    chekedIn_at: Date,
    chekedOut_at: Date,
  }
  /* {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  } */
);

/* bookingSchema.virtual("status").get(function () {
  if (this.isPaid && addOneYear(this.endDate) < new Date()) {
    return "checked Out";
  }
  if (this.isPaid) {
    return "checked In";
  }
  return "unconfirmed";
}); */

// Separate method for updating check-in/out status
bookingSchema.methods.updateCheckStatus = async function () {
  this.status = "unconfirmed";
  await this.save();
  /*   if (this.isPaid && addOneYear(this.endDate) < new Date()) {
    if (!this.checkedOut_at) {
      this.checkedOut_at = new Date();
      this.checkedIn_at = undefined;
      await this.save();
    }
  } else if (this.isPaid) {
    if (!this.checkedIn_at) {
      this.checkedIn_at = new Date();
      await this.save();
    }
  } */
};
bookingSchema.plugin(mongooseLeanVirtuals);

const Booking = mongoose.model("bookings", bookingSchema);

export default Booking;
