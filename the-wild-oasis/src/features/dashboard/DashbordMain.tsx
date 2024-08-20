import { BsBarChartLine } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { RiHandbagLine } from "react-icons/ri";
import TodayStatus from "./TodayStatus";
import StayDurationSummary from "./StayDurationSummary";
import SalesDashboard from "./SalesDashboard";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import State from "../bookings/State";
import { calculateWithFormatDate } from "../../Util/hllper";
/* import { ClipLoader } from "react-spinners";
 */ import Spinner from "../../Util/Spinner";

function DashbordMain() {
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
  const [searchParams] = useSearchParams();
  const last = searchParams.get("last") || "7";

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", last],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8800/api/v1/bookings/dashboard?last=${last}`
      );

      return response.data;
    },
  });
  if (isLoading) return <Spinner />;

  const { StateBooking, ToDayBooking, StayDurationSummaryData, salesBooking } =
    data;
  const booking = StateBooking.length;
  const sales = StateBooking.reduce((acc: number, cur: Booking) => {
    return acc + cur.cabinRef?.regularPrice;
  }, 0);

  const chekedin = StateBooking.filter(
    (b: Booking) => b.status === "checked In"
  );

  const occupancy =
    chekedin.reduce((acc: number, b: Booking) => {
      const { numberOfNights } = calculateWithFormatDate(
        b.created_at,
        b.endDate
      );
      return acc + numberOfNights;
    }, 0) / Number(last);

  return (
    <div className="dashboard-layout">
      <State
        icon={<RiHandbagLine />}
        title={"BOOKINGS"}
        color={"blueColor"}
        value={booking}
      />
      <State
        icon={<LiaMoneyBillWaveAltSolid />}
        title={"SALES"}
        color={"greenColor"}
        value={sales}
      />
      <State
        icon={<IoCalendarOutline />}
        title={"CHECK INS"}
        color={"indigoColor"}
        value={chekedin.length}
      />
      <State
        icon={<BsBarChartLine />}
        title={"OCCUPANCY RATE"}
        color={" yellowColor"}
        value={Math.round(occupancy)}
      />
      <TodayStatus ToDayBooking={ToDayBooking} />
      <StayDurationSummary StayDurationSummaryData={StayDurationSummaryData} />
      <SalesDashboard salesBooking={salesBooking} numDays={Number(last)} />
    </div>
  );
}

export default DashbordMain;
