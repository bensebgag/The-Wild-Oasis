import mongoose from "mongoose";
const { Schema } = mongoose;

const cabinSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  maxCapacity: {
    type: Number,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: "default-user.jpg",
  },
  description: {
    type: String,
    required: true,
  },
});

const Cabin = mongoose.model("cabines", cabinSchema);

export default Cabin;
