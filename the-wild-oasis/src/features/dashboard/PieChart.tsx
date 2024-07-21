// ExamplePieChart.tsx
import { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Define the type for the data items
interface DataItem {
  name: string;
  value: number;
}

const data: DataItem[] = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS: string[] = ["#f97316", "#eab308", "#84cc16", "#14b8a6"];

interface Props {}

interface State {}

export default class ExamplePieChart extends PureComponent<Props, State> {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o";

  render() {
    return (
      <ResponsiveContainer width="65%" height={310}>
        <PieChart>
          <Pie
            data={data}
            cx={115}
            cy={140}
            innerRadius={90}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
