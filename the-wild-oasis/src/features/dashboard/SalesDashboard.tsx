import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDarkMode } from "../../Context/DarkModeContext";
import {
  addYears,
  eachDayOfInterval,
  format,
  isSameDay,
  subDays,
} from "date-fns";
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
  salesBooking: Booking[];
  numDays: number;
}

function SalesDashboard({ salesBooking, numDays }: props) {
  const { isDarkMode } = useDarkMode();
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = allDates.map((date) => {
    return {
      label: format(date, "MM dd"),
      totalSales: salesBooking
        .filter((booking) => isSameDay(date, addYears(booking.created_at, 1)))
        .reduce((acc, cur) => acc + cur.cabinRef.regularPrice, 0),

      extrasSales: salesBooking
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc: number, cur: Booking) => {
          if (cur.hasBreakfast) return acc + 20;
          return acc;
        }, 0),
    };
  });
  const colors = !isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  return (
    <div className="saleDashboard">
      <div style={{ height: 300 }}>
        <span className="sales-title">Sales from 07 05 2024 — Jul 11 2024</span>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <YAxis
              unit={"$"}
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <Tooltip contentStyle={{ background: colors.background }} />
            <Area
              type="monotone"
              dataKey="totalSales"
              stackId="1"
              stroke={colors.totalSales.stroke}
              fill={colors.totalSales.fill}
            />
            <Area
              type="monotone"
              dataKey="extrasSales"
              stackId="1"
              stroke={colors.extrasSales.stroke}
              fill={colors.extrasSales.fill}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesDashboard;
