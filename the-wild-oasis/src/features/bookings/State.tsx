import { ReactNode } from "react";
import { formattedPrice } from "../../Util/hllper";

type props = {
  icon: ReactNode;
  title: string;
  color: string;
  value: number;
};

function State({ icon, title, color, value }: props) {
  return (
    <div className="Basic-Information">
      <span className={`iconShape ${color}`}>{icon}</span>
      <div className="detial">
        <span>{title}</span>
        <span>
          {" "}
          {title === "SALES"
            ? formattedPrice(value)
            : title === "OCCUPANCY RATE"
            ? `${value}%`
            : value}
        </span>
      </div>
    </div>
  );
}

export default State;
