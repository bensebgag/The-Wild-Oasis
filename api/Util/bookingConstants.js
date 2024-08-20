export const BOOKINGS_PER_PAGE = 10;

export const BOOKING_STATUSES = {
  "CHECKED-IN": "checked In",
  "CHECKED-OUT": "checked Out",
  UNCONFIRMED: "unconfirmed",
};

export const BOOKING_SORT_BY = new Map([
  ["startDate-desc", { startDate: -1 }],
  ["startDate-asc", { startDate: 1 }],
  ["totalPrice-desc", { regularPrice: -1 }],
  ["totalPrice-asc", { regularPrice: 1 }],
]);
