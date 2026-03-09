"use client";

import {
  Pie,
  PieChart,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DashboardPayload,
  OrdersByStatus,
  OrdersByCountry,
} from "@/types/dashboard.types";

interface DashboardOverviewChartProps {
  data?: DashboardPayload;
}

// Map specific countries to distinct colors for the Radial chart
const COUNTRY_COLORS: Record<string, string> = {
  US: "#3b82f6",
  UK: "#ef4444",
  DEFAULT: "#8b5cf6",
};

export function DashboardOverviewChart({ data }: DashboardOverviewChartProps) {
  if (!data) return null;

  const isCustomer = data.role === "customer";

  const chartTitle = isCustomer ? "Orders by Status" : "Orders by Country";
  const dataKey = isCustomer ? "total" : "total_orders";
  const nameKey = isCustomer ? "status_name" : "country";

  // Pre-process Data to inject fill colors for RadialBarChart
  const rawData = isCustomer
    ? data.orders_by_status || []
    : data.orders_by_country || [];

  const chartData = rawData.map((item: OrdersByStatus | OrdersByCountry) => {
    const itemKey = isCustomer
      ? (item as OrdersByStatus).status_name
      : (item as OrdersByCountry).country;

    return {
      ...item,
      fill: COUNTRY_COLORS[itemKey] || COUNTRY_COLORS.DEFAULT,
    };
  });

  return (
    <Card className="shadow-none border-none justify-between h-full pb-0 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>{chartTitle}</CardTitle>
          <CardDescription>
            Breakdown of your recent order volume
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 px-0 min-h-[250px]">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            {isCustomer ? (
              <PieChart>
                <Tooltip />
                <Pie
                  data={chartData}
                  dataKey={dataKey}
                  nameKey={nameKey}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="var(--primary)"
                  label
                />
              </PieChart>
            ) : (
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--primary)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--primary)"
                      stopOpacity={0.2}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey={nameKey}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  fontSize={12}
                  className="text-muted-foreground"
                />
                <Tooltip
                  cursor={{ fill: "var(--accent)", opacity: 0.2 }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    color: "hsl(var(--card-foreground))",
                  }}
                  itemStyle={{
                    color: "hsl(var(--foreground))",
                    fontWeight: 500,
                  }}
                />
                <Bar
                  dataKey={dataKey}
                  fill="url(#colorOrders)"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
