// bookingService.js
import Booking from "../models/bookingModel.js";
import Guest from "../models/guestModel.js";
import Cabin from "../models/cabinModel.js";
import { BOOKING_SORT_BY, BOOKING_STATUSES } from "../Util/bookingConstants.js";
class BookingService {
  static async getAllBookings(
    page,
    limit,
    sortby = "startDate-desc",
    statusIs = "all"
  ) {
    const skip = page * limit;
    let totalCount, bookings;
    if (statusIs === "all") {
      [totalCount, bookings] = await Promise.all([
        Booking.countDocuments(),
        Booking.find().skip(skip).limit(limit),
      ]);
    } else {
      [totalCount, bookings] = await Promise.all([
        Booking.countDocuments(),
        Booking.find(),
      ]);
    }

    const updatedBookings = await this.updateBookingReferences(bookings);
    const pipeline = [
      {
        $match: { _id: { $in: updatedBookings.map((b) => b._id) } },
      },
      {
        $lookup: {
          from: "guestes",
          localField: "guestRef",
          foreignField: "_id",
          as: "guestRef",
        },
      },
      { $unwind: "$guestRef" },
      {
        $lookup: {
          from: "cabines",
          localField: "cabinRef",
          foreignField: "_id",
          as: "cabinRef",
        },
      },
      { $unwind: "$cabinRef" },
      {
        $addFields: {
          regularPrice: "$cabinRef.regularPrice",
        },
      },
      {
        $sort: BOOKING_SORT_BY.get(sortby),
      },
      /* 
      {
        $addFields: {
          status: {
            $switch: {
              branches: [
                {
                  case: {
                    $and: [
                      { $eq: ["$isPaid", true] },
                      {
                        $lt: [
                          {
                            $add: [
                              { $toDate: "$endDate" },
                              { $multiply: [365, 24, 60, 60, 1000] },
                            ],
                          },
                          new Date(),
                        ],
                      },
                    ],
                  },
                  then: "checked Out",
                },
                {
                  case: { $eq: ["$isPaid", true] },
                  then: "checked In",
                },
                {
                  case: { $eq: ["$isPaid", false] },
                  then: "unconfirmed",
                },
              ],
              default: "unknown",
            },
          },
        },
      }, */
    ];

    if (statusIs !== "all") {
      pipeline.push({
        $match: { status: BOOKING_STATUSES[statusIs.toUpperCase()] },
      });
    }

    const populatedBookings = await Booking.aggregate(pipeline);

    const isLastPage = (page + 1) * limit >= totalCount;

    return {
      bookings: populatedBookings,
      totalCount,
      resultLength: populatedBookings.length,
      isLastPage,
    };
  }

  static async getBookingsByStatus(status) {
    const bookings = await Booking.find();
    const updatedBookings = await this.updateBookingReferences(bookings);

    return Booking.find({
      _id: {
        $in: updatedBookings.filter((b) =>
          b.status === status ? b._id : null
        ),
      },
    })
      .populate("guestRef", "fullName email")
      .populate("cabinRef")
      .lean({ virtuals: true });
  }

  static async updateBookingReferences(bookings) {
    const guestIds = bookings.map((booking) => booking.guestId);
    const cabinIds = bookings.map((booking) => booking.cabinId);
    const formattedcabinIds = cabinIds.map((num) =>
      num.toString().padStart(3, "0")
    );
    const guests = await Guest.find({ guestId: { $in: guestIds } });
    const cabines = await Cabin.find({ name: { $in: formattedcabinIds } });
    const guestMap = new Map(guests.map((guest) => [guest.guestId, guest._id]));
    const cabinMap = new Map(cabines.map((cabin) => [cabin.name, cabin._id]));
    const updatePromises = bookings.map((booking) => {
      booking.guestRef = guestMap.get(booking.guestId);
      booking.cabinRef = cabinMap.get(
        booking.cabinId.toString().padStart(3, "0")
      );
      return booking.save();
    });

    return Promise.all(updatePromises);
  }
}

export default BookingService;
