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

interface DataType {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

const data: DataType[] = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

function SalesDashboard() {
  const { isDarkMode } = useDarkMode();
  return (
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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stackId="1"
            stroke={isDarkMode ? "#16a34a" : "#22c55e"}
            fill={isDarkMode ? "#dcfce7" : " #22c55e"}
          />
          <Area
            type="monotone"
            dataKey="pv"
            stackId="1"
            stroke={
              isDarkMode ? "var(--color-brand-600)" : "var(--color-brand-200)"
            }
            fill={
              isDarkMode ? "var(--color-brand-200)" : "var(--color-brand-600)"
            }
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesDashboard;
