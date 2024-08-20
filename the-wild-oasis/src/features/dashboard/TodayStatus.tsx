import { useNavigate } from "react-router-dom";
import { calculateWithFormatDate } from "../../Util/hllper";
import NoActivity from "./NoActivity";
import "./TodayStatus.scss";
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
interface props {
  ToDayBooking: Booking[];
}
function TodayStatus({ ToDayBooking }: props) {
  const navigate = useNavigate();
  const handleCheck = (booking: Booking) => {
    navigate(`/bookings/${booking._id}`);
  };

  return (
    <div>
      <div className="today-status">
        <span className="today-status__title">Today</span>
        <ul className="today-status__list">
          {ToDayBooking.length > 0 ? (
            ToDayBooking.map((b) => {
              const { numberOfNights } = calculateWithFormatDate(
                b.created_at,
                b.endDate
              );

              return (
                <li key={b._id} className="today-status__item">
                  <div className="today-status__item-header">
                    <span
                      className={`today-status__item-status  ${
                        b.status === "unconfirmed" ? "ARRIVING" : "Departing"
                      }`}
                    >
                      {b.status === "unconfirmed" ? "ARRIVING" : "Departing"}{" "}
                    </span>
                    <span className="today-status__item-name">
                      <span className="fleg">fleg</span> {b.guestRef.fullName}
                    </span>
                  </div>
                  <div className="today-status__item-footer">
                    <span className="today-status__item-duration">
                      {numberOfNights}nights
                    </span>
                    <button
                      onClick={() => handleCheck(b)}
                      className="today-status__item-button"
                    >
                      {b.status === "check In" ? "CHECKED IN" : "CHEKED OUT"}
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <NoActivity />
          )}
        </ul>
      </div>
    </div>
  );
}

export default TodayStatus;
