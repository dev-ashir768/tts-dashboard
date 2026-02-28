import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, PackageOpen, Building2, MapPin } from "lucide-react";

const recentBookings = [
  {
    booking_id: "BKG-2026-001",
    client: "ElectroTech Inc.",
    destination: "New York, USA",
    weight: "1,200 kg",
    date: "2026-03-01",
    status: "Confirmed",
    statusColor: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  },
  {
    booking_id: "BKG-2026-002",
    client: "Global Retailers",
    destination: "London, UK",
    weight: "450 kg",
    date: "2026-03-02",
    status: "Pending",
    statusColor: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  },
  {
    booking_id: "BKG-2026-003",
    client: "Fast FMCG",
    destination: "Dubai, UAE",
    weight: "8,500 kg",
    date: "2026-03-02",
    status: "In Review",
    statusColor: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  },
  {
    booking_id: "BKG-2026-004",
    client: "MediCare Pharma",
    destination: "Berlin, DE",
    weight: "200 kg",
    date: "2026-03-03",
    status: "Confirmed",
    statusColor: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  },
  {
    booking_id: "BKG-2026-005",
    client: "AutoParts LLC",
    destination: "Tokyo, JP",
    weight: "3,100 kg",
    date: "2026-03-05",
    status: "Cancelled",
    statusColor: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  },
];

export function DashboardBookings() {
  return (
    <Card className="col-span-4 h-[400px] flex flex-col shadow-none border-none">
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardDescription>
          Latest shipping requests and their current status
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0 relative">
        <ScrollArea className="h-full pl-6 pr-6 pb-6 w-full">
          <div className="space-y-4">
            {recentBookings.map((booking, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/50 transition-colors hover:bg-muted"
              >
                <div className="flex gap-4 items-start sm:items-center">
                  <div className="p-2 rounded-full bg-primary/10 text-primary hidden sm:flex">
                    <PackageOpen className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold leading-none flex items-center gap-2">
                      {booking.booking_id}
                      <Badge
                        variant="secondary"
                        className={`text-[10px] sm:hidden px-2 py-0 border-none ${booking.statusColor}`}
                      >
                        {booking.status}
                      </Badge>
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        {booking.client}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {booking.destination}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                  <Badge
                    variant="secondary"
                    className={`text-[11px] hidden sm:flex px-2.5 py-0.5 border-none font-medium ${booking.statusColor}`}
                  >
                    {booking.status}
                  </Badge>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                    <span>{booking.weight}</span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {booking.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
