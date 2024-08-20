import "./BookingsLayout.scss";
import "../../UI/Table/Table.scss";
import { BookingFilters } from "./BookingFilters";

import { BookingTable } from "./BookingTable";

function BookingsLayout() {
  return (
    <div className="containerBookings">
      <div className="head">
        <h1>All bookings</h1>
        <BookingFilters />
      </div>

      <BookingTable />
    </div>
  );
}

export default BookingsLayout;
