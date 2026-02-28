import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";

// Dummy data representing orders/CNs
const recentActivity = [
  {
    cn_number: "CN-982374",
    customer: "Acme Corp",
    items: 45,
    status: "Delivered",
    time: "10 mins ago",
    icon: CheckCircle,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    cn_number: "CN-982375",
    customer: "Global Tech",
    items: 12,
    status: "In Transit",
    time: "2 hours ago",
    icon: Truck,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    cn_number: "CN-982376",
    customer: "Nexus Ltd",
    items: 150,
    status: "Processing",
    time: "5 hours ago",
    icon: Package,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    cn_number: "CN-982377",
    customer: "Stark Industries",
    items: 5,
    status: "Pending",
    time: "1 day ago",
    icon: Clock,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    cn_number: "CN-982378",
    customer: "Wayne Ent",
    items: 80,
    status: "Delivered",
    time: "1 day ago",
    icon: CheckCircle,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    cn_number: "CN-982379",
    customer: "Oscorp",
    items: 22,
    status: "In Transit",
    time: "2 days ago",
    icon: Truck,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
];

export function DashboardRecentActivity() {
  return (
    <Card className="col-span-3 h-[400px] flex flex-col shadow-none border-none">
      <CardHeader>
        <CardTitle>Recent Consignments</CardTitle>
        <CardDescription>
          Tracking CN statuses and order volumes
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0 relative">
        <ScrollArea className="h-full pl-6 pr-6 pb-6">
          <div className="space-y-6">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${activity.bg}`}>
                    <Icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.cn_number}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.customer} • {activity.items} Items
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge
                      variant="secondary"
                      className="text-[10px] bg-secondary/50 font-normal px-2 py-0"
                    >
                      {activity.status}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground block text-right">
                      {activity.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
