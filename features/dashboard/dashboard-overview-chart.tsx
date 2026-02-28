"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", orders: 186, customers: 80 },
  { month: "Feb", orders: 305, customers: 200 },
  { month: "Mar", orders: 237, customers: 120 },
  { month: "Apr", orders: 73, customers: 190 },
  { month: "May", orders: 209, customers: 130 },
  { month: "Jun", orders: 214, customers: 140 },
];

const chartConfig = {
  orders: {
    label: "Orders",
    color: "var(--primary)",
  },
  customers: {
    label: "Customers",
    color: "var(--tertiary)",
  },
} satisfies ChartConfig;

export function DashboardOverviewChart() {
  return (
    <Card className="shadow-none border-none justify-between h-full pb-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Platform Activity</CardTitle>
          <CardDescription>Orders and customers last 6 months</CardDescription>
        </div>
        <div className="flex items-center gap-2 font-medium text-sm text-green-500 bg-green-500/10 px-2 py-1 rounded-md">
          <TrendingUp className="h-4 w-4" />
          5.2%
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="customers"
              type="natural"
              fill="var(--color-customers)"
              fillOpacity={0.4}
              stroke="var(--color-customers)"
            />
            <Area
              dataKey="orders"
              type="natural"
              fill="var(--color-orders)"
              fillOpacity={0.4}
              stroke="var(--color-orders)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
