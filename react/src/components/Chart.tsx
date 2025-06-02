import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartAttributes = {
  hide: true,
  dataKey: "month",
  tickLine: false,
  axisLine: false,
  tickMargin: 8,
  tickFormatter: (value: string | any[]) => value.slice(0, 3),
};
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
    attributes: {
      dataKey: "desktop",
      type: "linear",
      fill: "var(--chart-1)",
      fillOpacity: 0.4,
      stroke: "var(--chart-1)",
      stackId: "a",
    },
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
    attributes: {
      dataKey: "mobile",
      type: "linear",
      fill: "var(--chart-1)",
      fillOpacity: 0.4,
      stroke: "var(--chart-1)",
      stackId: "a",
    },
  },
};

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

function Chart({
  config = chartConfig,
  Data = chartData,
  attributes = chartAttributes,
}: {
  config: ChartConfig;
  Data: any;
  attributes: Object;
}) {
  return (
    <ChartContainer config={config} className="h-32 w-full">
      <AreaChart
        accessibilityLayer
        data={Data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <XAxis {...attributes} />
        {Object.entries(chartConfig).map(([index, item]) => (
          // console.log(item.attributes);
          <Area key={index} {...(item as any).attributes} />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}

export default Chart;
