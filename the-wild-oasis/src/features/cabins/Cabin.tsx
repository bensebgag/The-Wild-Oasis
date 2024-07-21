import Tabel from "../../UI/Table/Tabel";
import Tbody from "../../UI/Table/Tbody";
import Thead from "../../UI/Table/Thead";
import Options from "../../UI/options/Options";
import "./Cabin.scss";
function Cabin() {
  return (
    <div className="containerCabins">
      <div className="head">
        <h1>All cabins</h1>
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
          <td className="test">CABIN</td>
          <td>CAPACITY</td>
          <td>PRICE</td>
          <td>DISCOUNT</td>
        </Thead>
        <Tbody>
          <tr>
            <td>
              <img
                src="https://qfvpyreitzgxuimnvjpy.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"
                alt=""
              />
            </td>
            <td>007</td>
            <td>Fits up to 2</td>
            <td>$250.00</td>

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
      </Tabel>
      <button className="btn-new-cabin">Add new cabin</button>
    </div>
  );
}

export default Cabin;
