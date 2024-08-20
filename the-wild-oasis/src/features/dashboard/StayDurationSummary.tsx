import { addYears, differenceInDays, parseISO } from "date-fns";
import { useDarkMode } from "../../Context/DarkModeContext";
import Booking from "../bookings/Booking";
import PieChart from "./PieChart";
import "./StayDurationSummary.scss";
import {
  startDataDark,
  startDataLight,
} from "../../data/stayDurationSummaryData";
interface GuestRef {
  _id: string;
  fullName: string;
  email: string;
}
interface CabinRef {
  _id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
}

interface Booking {
  _id: string;
  created_at: string;
  startDate: string;
  endDate: string;
  cabinId: number;
  guestId: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  numGuests: number;
  guestRef: GuestRef;
  cabinRef: CabinRef;
  status: string;
}
interface props {
  StayDurationSummaryData: Booking[];
}
interface DurationData {
  duration: string;
  value: number;
  color: string;
}
const StayDurationSummary: React.FC<props> = ({ StayDurationSummaryData }) => {
  function prepareData(
    StartData: DurationData[],
    Stays: Booking[]
  ): DurationData[] {
    const updatedData = [...StartData];

    Stays.forEach((booking) => {
      const startDate = parseISO(booking.startDate);
      const numberOfNights = differenceInDays(
        new Date(),
        addYears(startDate, 1)
      );
      updatedData.forEach((data) => {
        if (data.duration === "1 night" && numberOfNights === 1) data.value++;
        if (data.duration === "2 nights" && numberOfNights === 2) data.value++;
        if (data.duration === "3 nights" && numberOfNights === 3) data.value++;
        if (
          data.duration === "4-5 nights" &&
          (numberOfNights === 4 || numberOfNights === 5)
        )
          data.value++;
        if (
          data.duration === "6-7 nights" &&
          (numberOfNights === 6 || numberOfNights === 7)
        )
          data.value++;
        if (
          data.duration === "8-14 nights" &&
          numberOfNights >= 8 &&
          numberOfNights <= 14
        )
          data.value++;
        if (
          data.duration === "15-21 nights" &&
          numberOfNights >= 15 &&
          numberOfNights <= 21
        )
          data.value++;
        if (data.duration === "21+ nights" && numberOfNights > 21) data.value++;
      });
    });

    return updatedData;
  }

  const { isDarkMode } = useDarkMode();
  const updateData = !isDarkMode
    ? prepareData(startDataDark, StayDurationSummaryData)
    : prepareData(startDataLight, StayDurationSummaryData);
  return (
    <div className="PieChartContainer">
      <span className="title">Stay duration summary</span>
      <div className="content">
        <PieChart data={updateData} />
        <ul>
          {updateData.map((item) => {
            if (item.value > 0)
              return (
                <li key={item.color} style={{ color: item.color }}>
                  <span className="circle "></span> <span>{item.duration}</span>
                </li>
              );
          })}
        </ul>
      </div>
    </div>
  );
};

export default StayDurationSummary;
