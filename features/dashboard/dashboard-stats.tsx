import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserX, Boxes, Warehouse, FileCheck, FileX } from "lucide-react";
import { DashboardPayload } from "@/types/dashboard.types";

interface DashboardStatsProps {
  data?: DashboardPayload;
}

export function DashboardStats({ data }: DashboardStatsProps) {
  if (!data) return null;

  const stats = [
    {
      title: "Total Orders",
      value: data.total_orders || 0,
      description: "Total lifetime orders",
      icon: Boxes,
      color: "text-purple-500",
    },
  ];

  if (data.role !== "customer") {
    stats.unshift(
      {
        title: "Active Customers",
        value: data.total_active_customers || 0,
        description: "Currently active accounts",
        icon: Users,
        color: "text-green-500",
      },
      {
        title: "Inactive Customers",
        value: data.total_inactive_customers || 0,
        description: "Total inactive accounts",
        icon: UserX,
        color: "text-red-500",
      },
      {
        title: "Total Label Orders",
        value: data.total_label_orders || 0,
        description: "Orders with labels",
        icon: FileCheck,
        color: "text-emerald-500",
      },
      {
        title: "Total Unlabel Orders",
        value: data.total_unlabel_orders || 0,
        description: "Orders without labels",
        icon: FileX,
        color: "text-orange-500",
      },
      {
        title: "Total Warehouses",
        value: data.total_warehouses || 0,
        description: "Active warehouse locations",
        icon: Warehouse,
        color: "text-blue-500",
      },
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 whitespace-nowrap">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card className="shadow-none border-none" key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
