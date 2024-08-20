// bookingController.js
import mongoose from "mongoose";
import BookingService from "../services/BookingService.js";
import { ApiError } from "../Util/apiError.js";
import { catchAsync } from "../Util/catchAsync.js";
import { BOOKINGS_PER_PAGE } from "../Util/bookingConstants.js";
import Booking from "../models/bookingModel.js";
import { addYears, subDays, subYears, isSameDay } from "date-fns";

export const getAllBookings = catchAsync(async (req, res) => {
  const { status, sortBy } = req.query;
  const page = Math.max(0, parseInt(req.query.page) || 0);
  const { bookings, totalCount, isLastPage, resultLength } =
    await BookingService.getAllBookings(
      page,
      BOOKINGS_PER_PAGE,
      sortBy,
      status
    );

  res.status(200).json({
    status: "success",
    data: { bookings, totalCount, isLastPage, resultLength },
  });
});

export const getBookingById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const booking = await Booking.findById(id)
    .populate("guestRef")
    .populate("cabinRef");

  if (!id || !booking) {
    return next(new ApiError("please provide a valid id", 400));
  }

  res.status(200).json({
    status: "success",
    data: { booking },
  });
});

export const CheckinBooking = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const booking = await Booking.findByIdAndUpdate(
    id,
    {
      isPaid: true,
      status: "checked In",
      chekedIn_at: Date.now(),
    },
    { new: true, runValidators: true }
  );
  if (!id || !booking) {
    return next(new ApiError("please provide a valid id", 400));
  }

  res.status(200).json({
    status: "success",
    data: { booking },
  });
});

export const CheckoutBooking = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const booking = await Booking.findByIdAndUpdate(
    id,
    {
      endDate: subYears(new Date(), 1),
      status: "checked Out",
      chekedOut_at: Date.now(),
    },
    { new: true, runValidators: true }
  );
  if (!id || !booking) {
    return next(new ApiError("please provide a valid id", 400));
  }

  res.status(200).json({
    status: "success",
    data: { booking },
  });
});

export const deleteBookings = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Please provide a valid id", 400));
  }

  const deletedBooking = await Booking.findByIdAndDelete(id);

  if (!deletedBooking) {
    return next(new ApiError("No booking found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Booking deleted successfully",
    data: { deletedBooking },
  });
});

export const dashboardState = catchAsync(async (req, res) => {
  const { last } = req.query;
  let currentDate = new Date();
  currentDate = subYears(currentDate, 1);
  const DaysAgo = subDays(currentDate, +last);
  let bookngAfterDaysAgo = [];
  let bookingsStateToDay = [];
  let StayDurationSummary = [];
  const booking = await Booking.find()
    .populate("guestRef")
    .populate("cabinRef");

  booking.forEach((b) => {
    if (b.created_at >= DaysAgo) {
      bookngAfterDaysAgo.push(b);
    }
    const startDate = addYears(b.startDate, 1);
    const endDate = addYears(b.endDate, 1);
    if (b.status === "checked In" && isSameDay(endDate, new Date())) {
      bookingsStateToDay.push(b);
    }
    if (b.status === "unconfirmed" && isSameDay(startDate, new Date())) {
      bookingsStateToDay.push(b);
    }
    if (
      (b.created_at >= DaysAgo && b.status === "checked Out") ||
      (b.created_at >= DaysAgo && b.status === "checked In")
    )
      StayDurationSummary.push(b);
  });

  res.status(200).json({
    status: "success",
    StateBooking: bookngAfterDaysAgo,
    ToDayBooking: bookingsStateToDay,
    StayDurationSummaryData: StayDurationSummary,
    salesBooking: bookngAfterDaysAgo,
  });
});
