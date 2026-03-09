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
import { DashboardPayload } from "@/types/dashboard.types";

interface DashboardRecentActivityProps {
  data?: DashboardPayload;
}

const getStatusDetails = (statusName: string) => {
  const normalized = statusName?.toLowerCase();
  switch (normalized) {
    case "delivered":
      return {
        icon: CheckCircle,
        color: "text-green-500",
        bg: "bg-green-500/10",
      };
    case "in transit":
      return { icon: Truck, color: "text-blue-500", bg: "bg-blue-500/10" };
    case "processing":
      return {
        icon: Package,
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
      };
    case "new":
      return { icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" };
    case "confirmed":
      return {
        icon: CheckCircle,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
      };
    default:
      return { icon: Package, color: "text-gray-500", bg: "bg-gray-500/10" };
  }
};

export function DashboardRecentActivity({
  data,
}: DashboardRecentActivityProps) {
  if (!data) return null;

  const activities = data.recent_orders || [];

  return (
    <Card className="col-span-3 h-[400px] flex flex-col shadow-none border-none">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Tracking latest order statuses</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0 relative">
        <ScrollArea className="h-full pl-6 pr-6 pb-6">
          <div className="space-y-6">
            {activities.length === 0 ? (
              <div className="text-muted-foreground text-sm pt-4">
                No recent orders found.
              </div>
            ) : (
              activities.map((activity, index) => {
                const statusDetails = getStatusDetails(
                  activity.status_name || "",
                );
                const Icon = statusDetails.icon;

                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${statusDetails.bg}`}>
                      <Icon className={`w-4 h-4 ${statusDetails.color}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Order #{activity.order_id} -{" "}
                        {activity.tracking_id || "N/A"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.acno}{" "}
                        {activity.full_name && `• ${activity.full_name}`}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant="secondary"
                        className="text-[10px] bg-secondary/50 font-normal px-2 py-0"
                      >
                        {activity.status_name || "Unknown"}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground block text-right">
                        {activity.created_date
                          ? new Date(activity.created_date).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
