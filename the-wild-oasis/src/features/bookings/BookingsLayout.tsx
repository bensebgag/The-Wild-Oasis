import Tabel from "../../UI/Table/Tabel";
import Tbody from "../../UI/Table/Tbody";
import Tfoot from "../../UI/Table/Tfoot";
import Thead from "../../UI/Table/Thead";
import Options from "../../UI/options/Options";
import "./BookingsLayout.scss";
function BookingsLayout() {
  return (
    <div className="containerBookings">
      <div className="head">
        <h1>All bookings</h1>
        <div className="buttonSeclectionContainer">
          <div className="buttons">
            <button>All</button>
            <button>checked out</button>
            <button>checked in</button>
            <button>unconfimed</button>
          </div>
          <select className="SortByDate">
            <option value="date-recent">sort by date(recent first)</option>
            <option value="date-erlaier">sort by date(erlaier first)</option>
            <option value="amount-high">sort by amount(high first)</option>
            <option value="amount-lower">sort by amount(lower first)</option>
          </select>
        </div>
      </div>
      <Tabel>
        <Thead>
          <td>CABIN</td>
          <td>GEST</td>
          <td>DATES</td>
          <td>STATUS</td>
          <td>AMOUNT</td>
        </Thead>
        <Tbody>
          <tr>
            <td>007</td>
            <td className="gest">
              <span>Nina Williams</span>
              <span>nina@hotmail.com</span>
            </td>
            <td className="dates">
              <span>in 1 month → 10 night stay </span>
              <span>Aug 26 2024 — Sep 05 2024</span>
            </td>
            <td>
              <span>UNCONFIRMED</span>
            </td>
            <td>$6,050.00</td>

            <Options>
              <li>
                <button>See details</button>
              </li>
              <li>
                <button>Chek in</button>
              </li>
              <li>
                <button>Delete booking</button>
              </li>
            </Options>
          </tr>
        </Tbody>
        <Tfoot>
          <span>Showing 1 to 10 of 24 results</span>
          <div className="buttons">
            <button>Previous</button>
            <button>Next</button>
          </div>
        </Tfoot>
      </Tabel>
    </div>
  );
}

export default BookingsLayout;
