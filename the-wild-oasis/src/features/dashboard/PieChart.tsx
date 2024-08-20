import { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";

// Define the type for the data items
interface DataItem {
  name: string;
  value: number;
  color: string;
  duration: string;
}

interface Props {
  data: DataItem[];
}

interface State {}

export default class ExamplePieChart extends PureComponent<Props, State> {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o";

  render() {
    const { data } = this.props;

    // Define proper types for the CustomTooltip props
    const CustomTooltip = ({
      active,
      payload,
    }: TooltipProps<number, string>) => {
      if (active && payload && payload.length) {
        const dataItem = payload[0].payload as DataItem;
        return (
          <div className="custom-tooltip">
            <p>{`${dataItem.duration}: ${dataItem.value}`}</p>
          </div>
        );
      }
      return null;
    };

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
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
