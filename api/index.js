import express from "express";
import cron from "node-cron";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookingRouter from "./routes/bookingRoutes.js";
import Booking from "./models/bookingModel.js";
import userRoute from "./routes/userRoute.js";
import settingRoute from "./routes/settingRoute.js";
import cabinRoute from "./routes/cabinRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import { addDays, subDays } from "date-fns";
import cookieParser from "cookie-parser";
import { errorHandler } from "./controlles/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();
console.log(app.get("env"));
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database connected");
  } catch (e) {
    console.log(e);
  }
};

app.use(express.json({ limit: "10kb" }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/cabins", express.static(path.join(__dirname, "cabins")));
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/cabines", cabinRoute);
app.use("/api/v1/setting", settingRoute);
app.use("/api/v1/users", userRoute);
app.use(errorHandler);

cron.schedule("0 0 */15 * *", async () => {
  try {
    const currentDate = new Date();

    const fifteenDaysAgo = subDays(currentDate, 15);
    const fifteenDaysFromNow = addDays(currentDate, 15);

    await Booking.updateMany(
      { created_at: { $lte: fifteenDaysAgo } },
      {
        $set: {
          created_at: currentDate,
          startDate: fifteenDaysFromNow,
          endDate: fifteenDaysFromNow,
        },
      }
    );

    console.log("Booking dates updated successfully!");
  } catch (err) {
    console.error("Error updating booking dates:", err);
  }
});

app.listen(8800, () => {
  console.log("Server running on port 8800");
  connect();
});
