import axios from "axios";

export const getBookingById = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8800/api/v1/bookings/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching booking data");
  }
};
export const deleteBookingById = async (id: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:8800/api/v1/bookings/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching booking data");
  }
};
export const updateBookingChekin = async (id: string) => {
  const response = await axios.put(
    `http://localhost:8800/api/v1/bookings/checkin/${id}`
  );
  return response.data;
};
export const updateBookingCheckout = async (id: string) => {
  const response = await axios.put(
    `http://localhost:8800/api/v1/bookings/checkout/${id}`
  );
  return response.data;
};
