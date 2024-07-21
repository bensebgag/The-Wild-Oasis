import PieChart from "./PieChart";
import "./StayDurationSummary.scss";
const StayDurationSummary: React.FC = () => {
  return (
    <div className="PieChartContainer">
      <span className="title">Stay duration summary</span>
      <div className="content">
        <PieChart />
        <ul>
          <li className="orangeColor">
            <span className="circle "></span> <span>2 nights</span>
          </li>
          <li className="yellowColor">
            <span className="circle"></span> <span>3 nights</span>
          </li>
          <li className="greenColor">
            <span className="circle"></span> <span>4-5 nights</span>
          </li>
          <li className="blueColor">
            <span className="circle"></span> <span>8-14 nights</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StayDurationSummary;
