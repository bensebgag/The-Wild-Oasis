const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  guestId: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  nationality: {
    type: String,
    required: true,
    trim: true,
  },
  nationalID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  countryFlag: {
    type: String,
    required: true,
    match: [
      /^https:\/\/flagcdn\.com\/[a-z]{2}\.svg$/,
      "Please use a valid country flag URL.",
    ],
  },
});

// Create a model using the schema
const Guest = mongoose.model("guestes", guestSchema);

module.exports = Guest;
