import { useSearchParams } from "react-router-dom";
function DashboardFilters() {
  const [searchParams, setsearchParams] = useSearchParams();
  const last = searchParams.get("last") || "7";
  const handleClickWeek = () => {
    setsearchParams({ last: "7" });
  };
  const handleClickMonth = () => {
    setsearchParams({ last: "30" });
  };
  const handleClickThreeMonth = () => {
    setsearchParams({ last: "90" });
  };
  return (
    <div className="head">
      <span>Dashboard</span>
      <div>
        <button
          className={`${last === "7" ? "active" : ""}`}
          onClick={handleClickWeek}
        >
          Last 7 days
        </button>
        <button
          className={`${last === "30" ? "active" : ""}`}
          onClick={handleClickMonth}
        >
          Last 30 days
        </button>
        <button
          className={`${last === "90" ? "active" : ""}`}
          onClick={handleClickThreeMonth}
        >
          Last 90 days
        </button>
      </div>
    </div>
  );
}

export default DashboardFilters;
