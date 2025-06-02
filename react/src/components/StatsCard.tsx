"use client";
import { ThermometerSnowflake } from "lucide-react";
import { ChartConfig } from "./ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import Chart from "./Chart";

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
};

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

function StatsCard({
  config = chartConfig,
  Data = chartData,
  attributes = chartAttributes,
  showChart = true,
  icon = <ThermometerSnowflake className="text-blue-500" />,
  label = "Temperature",
  description = "50 Readings",
}: {
  config: ChartConfig;
  Data: any;
  attributes: Object;
  showChart: boolean;
  icon: React.ReactNode;
  label: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <div>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <div className="bg-primary-foreground p-4 rounded-lg">
            <h2 className="text-xl font-bold">{label}</h2>
            <p className="text-color text-sm">{description}</p>
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          {icon}
        </div>
        {showChart && (
          <div className="col-span-4">
            <Chart config={config} Data={Data} attributes={attributes} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsCard;
