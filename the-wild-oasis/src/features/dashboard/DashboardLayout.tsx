import "./DahboardLayout.scss";
import { RiHandbagLine } from "react-icons/ri";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { BsBarChartLine } from "react-icons/bs";
import StayDurationSummary from "./StayDurationSummary";
import TodayStatus from "./TodayStatus";
import SalesDashboard from "./SalesDashboard";

function DashboardLayout() {
  return (
    <div className="container">
      <div className="head">
        <span>Dashboard</span>
        <div>
          <button>Last 7 days</button>
          <button>Last 30 days</button>
          <button>Last 90 days</button>
        </div>
      </div>
      <div className="dashboard-layout">
        <div className="Basic-Information">
          <span className="iconShape blueColor">
            <RiHandbagLine />
          </span>
          <div className="detial">
            <span>BOOKINGS</span>
            <span>19</span>
          </div>
        </div>
        <div className="Basic-Information">
          <span className="iconShape greenColor">
            <LiaMoneyBillWaveAltSolid />
          </span>
          <div className="detial">
            <span>SALES</span>
            <span>$63,335.00</span>
          </div>
        </div>
        <div className="Basic-Information">
          <span className="iconShape indigoColor">
            <IoCalendarOutline />
          </span>
          <div className="detial">
            <span>CHECK INS</span>
            <span>10</span>
          </div>
        </div>
        <div className="Basic-Information">
          <span className="iconShape yellowColor ">
            <BsBarChartLine />
          </span>
          <div className="detial">
            <span>OCCUPANCY RATE</span>
            <span>22%</span>
          </div>
        </div>
        <div>
          <TodayStatus />
        </div>
        <StayDurationSummary />
        <div className="saleDashboard">
          <SalesDashboard />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
