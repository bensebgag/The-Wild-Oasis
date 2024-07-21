import "./Booking.scss";
function Booking() {
  return (
    <div className="Booking">
      <div className="heading">
        <div>
          <h1>
            Booking <span>#21346 </span>
          </h1>
          <span>UNCONFIRMED</span>
        </div>

        <button> Back</button>
      </div>
      <div className="body">
        <div className="body__head">
          <span>15 nights in Cabin 002</span>
          <span>Tue, Aug 20 2024 (In 1 month) — Wed, Sep 04 2024</span>
        </div>
        <div className="body__body">
          <div className="gest">
            <span>Emma Watson + 1 guests</span>
            <span>• emma@gmail.com</span>
            <span>• National ID 1234578901</span>
          </div>
          <span className="breakfast">Breakfast included? Yes</span>
          <div className="price">
            <div>
              <span>Total price</span>
              <span>$5,325.00 ($4,875.00 cabin + $450.00 breakfast)</span>
            </div>
            <span>WILL PAY AT PROPERTY</span>
          </div>
          <span className="booked_day">Booked Sat, Jul 13 2024, 12:47 PM</span>
        </div>
      </div>
      <div className="buttons">
        <button className="check">Check in</button>
        <button className="delete">Delete booking</button>
        <button className="back">Back</button>
      </div>
    </div>
  );
}

export default Booking;
