import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookingRouter from "./routes/bookingRoutes.js";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("data base");
  } catch (e) {
    console.log(e);
  }
};

app.use(express.json({ limit: "10kb" }));
app.use("/api/v1/bookings", bookingRouter);

app.listen(8800, () => {
  console.log("connect ");
  connect();
});
