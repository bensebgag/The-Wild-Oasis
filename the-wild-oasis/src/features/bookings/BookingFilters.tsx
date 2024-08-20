import { useSearchParams } from "react-router-dom";

export const BookingFilters = () => {
  const [searchParams, setsearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  function handelClickAll() {
    setsearchParams({ status: "all" });
  }
  function handleClickCheckedOut() {
    setsearchParams({ status: "checked-out", sortBy: sortBy });
  }
  function handleClickCheckedIn() {
    setsearchParams({ status: "checked-in", sortBy: sortBy });
  }
  function handleClickUnconfirmed() {
    setsearchParams({ status: "unconfirmed", sortBy: sortBy });
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setsearchParams({
      sortBy: event.target.value,
      status: searchParams.get("status") ?? "all",
      page: searchParams.get("page") ?? "1",
    });
  };
  const status = searchParams.get("status") || "all";
  return (
    <div className="buttonSeclectionContainer">
      <div className="buttons">
        <button
          onClick={handelClickAll}
          className={`${status === "all" ? "active" : ""}`}
        >
          All
        </button>
        <button
          className={`${status === "checked-out" ? "active" : ""}`}
          onClick={handleClickCheckedOut}
        >
          Checked Out
        </button>

        <button
          className={`${status === "checked-in" ? "active" : ""}`}
          onClick={handleClickCheckedIn}
        >
          Checked In
        </button>

        <button
          className={`${status === "unconfirmed" ? "active" : ""}`}
          onClick={handleClickUnconfirmed}
        >
          Unconfirmed
        </button>
      </div>
      <select className="SortByDate" onChange={handleSortChange}>
        <option value="startDate-desc">sort by date(recent first)</option>
        <option value="startDate-asc">sort by date(erlaier first)</option>
        <option value="totalPrice-desc">sort by amount(high first)</option>
        <option value="totalPrice-asc">sort by amount(lower first)</option>
      </select>
    </div>
  );
};
