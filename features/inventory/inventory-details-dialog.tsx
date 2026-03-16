import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InventoryListType } from "@/types/inventory.types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface InventoryDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inventory: InventoryListType | null;
}

export function InventoryDetailsDialog({
  open,
  onOpenChange,
  inventory,
}: InventoryDetailsDialogProps) {
  if (!inventory) return null;

  const baseUrl = process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || "";
  const imageUrl = inventory.image
    ? inventory.image.startsWith("http")
      ? inventory.image
      : `${baseUrl}/user_${inventory.user_id}/${inventory.image}`
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Inventory Details
            <span className="text-muted-foreground text-sm font-normal">
              #{inventory.id}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Left Column: Image & Basic Info */}
          <div className="space-y-6">
            <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted flex items-center justify-center group">
              {imageUrl ? (
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-full cursor-zoom-in"
                >
                  <Image
                    src={imageUrl}
                    alt={inventory.sku_name}
                    width={800}
                    height={450}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                </a>
              ) : (
                <span className="text-muted-foreground text-xs italic">
                  No image available
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                  Identifiers
                </h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-muted-foreground">SKU Code:</span>
                  <span className="font-medium text-right md:text-left">
                    {inventory.sku_code}
                  </span>
                  <span className="text-muted-foreground">Warehouse ID:</span>
                  <span className="font-medium text-right md:text-left">
                    WH-{inventory.warehouse_id}
                  </span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                  Status & Origin
                </h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <div>
                    <Badge
                      variant={inventory.status === 1 ? "active" : "inactive"}
                    >
                      {inventory.status === 1 ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <span className="text-muted-foreground">Country:</span>
                  <span className="font-medium text-right md:text-left capitalize">
                    {inventory.country || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                Stock & Value
              </h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-muted-foreground">Quantity:</span>
                <span className="font-bold text-lg text-primary text-right md:text-left">
                  {inventory.quantity}
                </span>
                <span className="text-muted-foreground">Unit Amount:</span>
                <span className="font-medium text-right md:text-left">
                  {inventory.amount}
                </span>
                <span className="text-muted-foreground text-xs">Total:</span>
                <span className="text-xs font-semibold text-right md:text-left">
                  {(Number(inventory.amount) * inventory.quantity).toFixed(2)}
                </span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                Account Information
              </h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-muted-foreground">Account No:</span>
                <span className="font-medium text-right md:text-left">
                  {inventory.acno}
                </span>
                <span className="text-muted-foreground">Created Date:</span>
                <span className="font-medium text-right md:text-left">
                  {new Date(inventory.created_date).toLocaleString()}
                </span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                Description
              </h3>
              <div className="bg-muted/50 p-4 rounded-md border text-sm italic min-h-[80px]">
                {inventory.description || "No description provided."}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
