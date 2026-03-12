import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderListType } from "@/types/order.types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OrderDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderListType | null;
}

export function OrderDetailsDialog({
  open,
  onOpenChange,
  order,
}: OrderDetailsDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Order Details{" "}
            <span className="text-muted-foreground text-sm font-normal">
              #{order.order_id}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Left Column: General & Account Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 whitespace-nowrap">
                General Information
              </h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                <span className="text-muted-foreground">Status:</span>
                <div>
                  <Badge
                    variant={
                      order.status_name?.toLowerCase() as React.ComponentProps<
                        typeof Badge
                      >["variant"]
                    }
                  >
                    {order.status_name || "N/A"}
                  </Badge>
                </div>

                <span className="text-muted-foreground">Created Date:</span>
                <span className="font-medium text-right md:text-left">
                  {order.created_date
                    ? new Date(order.created_date).toLocaleString()
                    : "N/A"}
                </span>

                <span className="text-muted-foreground">Country:</span>
                <span className="font-medium text-right md:text-left">
                  {order.country || "N/A"}
                </span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 whitespace-nowrap">
                Account & Customer
              </h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                <span className="text-muted-foreground">Account No:</span>
                <span className="font-medium text-right md:text-left">
                  {order.acno || "N/A"}
                </span>

                <span className="text-muted-foreground">Full Name:</span>
                <span className="font-medium text-right md:text-left">
                  {order.full_name || "N/A"}
                </span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 whitespace-nowrap">
                Remarks
              </h3>
              <p className="text-sm font-medium break-all bg-muted/50 p-3 rounded-md min-h-[60px] border border-border/50">
                {order.remarks || "No remarks"}
              </p>
            </div>
          </div>

          {/* Right Column: Logistics Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 whitespace-nowrap">
                Identifiers
              </h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                <span className="text-muted-foreground">Tracking ID:</span>
                <span className="font-medium text-right md:text-left">
                  {order.tracking_id || "N/A"}
                </span>

                <span className="text-muted-foreground">ASIN ID:</span>
                <span className="font-medium text-right md:text-left">
                  {order.asin_id || "N/A"}
                </span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 whitespace-nowrap">
                Routing Addresses
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-2">
                    Shipper/3PL Address:
                  </span>
                  <p className="font-medium bg-muted/50 p-3 rounded-md whitespace-pre-wrap break-all text-xs border border-border/50 min-h-[60px]">
                    {order.shipper_address || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-2">
                    Consignee Address:
                  </span>
                  <p className="font-medium bg-muted/50 p-3 rounded-md whitespace-pre-wrap break-all text-xs border border-border/50 min-h-[60px]">
                    {order.consignee_address || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {order.label_image && order.label_image.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">
              Label Images
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {order.label_image.map((image, index) => {
                const baseUrl = process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || "";
                const imageUrl = image.startsWith("http") 
                  ? image 
                  : `${baseUrl}/user_${order.user_id}/${image}`;

                return (
                  <div 
                    key={index} 
                    className="relative aspect-square rounded-lg overflow-hidden border bg-muted flex items-center justify-center group cursor-zoom-in"
                  >
                    <a 
                      href={imageUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full h-full"
                    >
                      <img
                        src={imageUrl}
                        alt={`Label ${index + 1}`}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
