import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, UserX, Boxes, CheckCircle2 } from "lucide-react";

const mockStats = [
  {
    title: "Active Customers",
    value: "1,245",
    description: "+15% from last month",
    icon: Users,
    color: "text-green-500",
  },
  {
    title: "Inactive Customers",
    value: "123",
    description: "-5% from last month",
    icon: UserX,
    color: "text-red-500",
  },
  {
    title: "Active Staff",
    value: "45",
    description: "+2 new this week",
    icon: CheckCircle2,
    color: "text-blue-500",
  },
  {
    title: "Total Orders (MTD)",
    value: "8,549",
    description: "+2,100 from last month",
    icon: Boxes,
    color: "text-purple-500",
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {mockStats.map((stat, i) => {
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
