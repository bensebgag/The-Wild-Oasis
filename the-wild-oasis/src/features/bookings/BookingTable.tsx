import Tabel from "../../UI/Table/Tabel";
import Tbody from "../../UI/Table/Tbody";
import Thead from "../../UI/Table/Thead";
import Options from "../../UI/options/Options";
import "../../UI/Table/Table.scss";
import Pagination from "./Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBookings } from "../../hook/useBookings";
import { calculateWithFormatDate, formattedPrice } from "../../Util/hllper";
import Spinner from "../../Util/Spinner";

interface GuestRef {
  _id: string;
  fullName: string;
  email: string;
}
interface CabinRef {
  _id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
}

interface Booking {
  _id: string;
  created_at: string;
  startDate: string;
  endDate: string;
  cabinId: number;
  guestId: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  numGuests: number;
  guestRef: GuestRef;
  cabinRef: CabinRef;
  status: string;
}

export const BookingTable: React.FC = () => {
  const handleDetail = (booking: Booking) => {
    navigate(`/bookings/${booking._id}`);
  };

  const handleCheckIn = (booking: Booking) => {
    navigate(`/bookings/${booking._id}`);
  };

  const handleDelete = (booking: Booking) => {
    navigate(`/bookings/${booking._id}`);
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handlePageChange = (newPageNumber: number) => {
    if (!searchParams.get("status") && !searchParams.get("sortBy"))
      navigate(`/bookings?page=${newPageNumber}`);
    else if (searchParams.get("status") && !searchParams.get("sortBy"))
      navigate(
        `/bookings?page=${newPageNumber}&status=${searchParams.get("status")}`
      );
    else if (!searchParams.get("status") && searchParams.get("sortBy"))
      navigate(
        `/bookings?page=${newPageNumber}&sortBy=${searchParams.get("sortBy")}`
      );
    else
      navigate(
        `/bookings?page=${newPageNumber}&status=${searchParams.get(
          "status"
        )}&sortBy=${searchParams.get("sortBy")}`
      );
  };

  const {
    bookings,
    isLoading,
    isError,
    error,
    pageNumber,
    isLastPage,
    handleNextPage,
    handlePreviousPage,
    resultLength,
    totalCount,
    status,
  } = useBookings();

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <Tabel>
      <Thead>
        <td>CABIN</td>
        <td>GUEST</td>
        <td>DATES</td>
        <td>STATUS</td>
        <td>AMOUNT</td>
      </Thead>
      <Tbody>
        {bookings.map((booking: Booking) => {
          const {
            numberOfNights,
            timeUntilStay,
            formattedStartDate,
            formattedEndDate,
          } = calculateWithFormatDate(booking.created_at, booking.endDate);

          return (
            <tr key={booking._id}>
              <td>00{booking.cabinId}</td>
              <td className="gest">
                <span>{booking.guestRef.fullName}</span>
                <span>{booking.guestRef.email}</span>
              </td>
              <td className="dates">
                <span>
                  {timeUntilStay}→{numberOfNights} night stay
                </span>
                <span>
                  {formattedStartDate}→{formattedEndDate}
                </span>
              </td>
              <td>
                {" "}
                <span
                  className={`status ${
                    booking.status === "checked Out"
                      ? "checked-out"
                      : booking.status === "checked In"
                      ? "checked-in"
                      : "unconfirmed "
                  } `}
                >
                  {booking.status}
                </span>{" "}
              </td>
              <td>{formattedPrice(booking.cabinRef.regularPrice)}</td>
              <Options>
                <li>
                  <button onClick={() => handleDetail(booking)}>
                    See details
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCheckIn(booking)}>
                    Check in
                  </button>
                </li>
                <li>
                  <button onClick={() => handleDelete(booking)}>
                    Delete booking
                  </button>
                </li>
              </Options>
            </tr>
          );
        })}
      </Tbody>
      {status === "all" && (
        <Pagination
          pageNumber={pageNumber}
          isLastPage={isLastPage}
          onPrevious={() => {
            handlePreviousPage();
            handlePageChange(pageNumber - 1);
          }}
          onNext={() => {
            handleNextPage();
            handlePageChange(pageNumber + 1);
          }}
          resultLength={resultLength}
          totalCount={totalCount}
        />
      )}
    </Tabel>
  );
};
