import mongoose from "mongoose";
const { Schema } = mongoose;

const settingSchema = new Schema({
  minimumNights: {
    type: Number,
    required: true,
    min: 1,
  },
  maximumNights: {
    type: Number,
    required: true,
    min: 1,
  },
  maximumGuests: {
    type: Number,
    required: true,
    min: 1,
  },
  breakfastPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

settingSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Setting = mongoose.model("Setting", settingSchema);

export default Setting;
