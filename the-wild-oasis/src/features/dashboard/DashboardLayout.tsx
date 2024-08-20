import "./DahboardLayout.scss";

import DashboardFilters from "./DashboardFilters";
import DashbordMain from "./DashbordMain";

function DashboardLayout() {
  return (
    <div className="container">
      <DashboardFilters />
      <DashbordMain />
    </div>
  );
}

export default DashboardLayout;
