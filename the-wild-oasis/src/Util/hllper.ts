import {
  addYears,
  format,
  differenceInDays,
  formatDistanceStrict,
  parseISO,
} from "date-fns";

export function calculateWithFormatDate(startDate: string, endDate: string) {
  const parsedStartDate = addYears(new Date(startDate), 1);
  const parsedEndDate = addYears(new Date(endDate), 1);
  const numberOfNights = differenceInDays(parsedEndDate, parsedStartDate);
  const timeUntilStay = formatDistanceStrict(parsedStartDate, new Date(), {
    addSuffix: true,
  });
  const formattedStartDate = format(parsedStartDate, "MMM dd yyyy");
  const formattedEndDate = format(parsedEndDate, "MMM dd yyyy");
  return {
    numberOfNights,
    timeUntilStay,
    formattedStartDate,
    formattedEndDate,
  };
}
export const formattedPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);
};
export const formatDateCreatedBookingAt = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    const dateWithAddedYear = addYears(date, 1);
    return format(dateWithAddedYear, "EEE, MMM dd yyyy, hh:mm a");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};
