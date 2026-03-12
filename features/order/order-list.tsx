"use client";

import { DataTable } from "@/components/shared/datatable/datatable";
import EmptyState from "@/components/shared/empty-state";
import Header from "@/components/shared/header";
import TableSkeleton from "@/components/shared/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOrderQuery } from "@/hooks/queries/order.queries";
import { API_ENDPOINTS, DEFAULT_VALUES } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import { OrderListType } from "@/types/order.types";
import { useState } from "react";
import { useOrderMutation } from "@/hooks/mutations/order.mutations";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import OrderFormDialog from "./order-form-dialog";
import { OrderDetailsDialog } from "./order-details-dialog";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

const OrderList = () => {
  const { user } = useAuthStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderListType | null>(
    null,
  );
  const [confirmingOrderId, setConfirmingOrderId] = useState<number | null>(
    null,
  );
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<{
    order: OrderListType;
    endpoint: any;
    label: string;
  } | null>(null);

  // Mutations
  const { mutateAsync: updateOrderStatusAsync } =
    useOrderMutation.UpdateOrderStatusMutation();

  const data = {
    user_id: user ? Number(user.id) : null,
    acno: user ? user.acno : null,
  };

  //========== Data Fetching ==========
  const {
    data: orderListResponse,
    isLoading: orderListLoading,
    isError: orderListError,
  } = useOrderQuery.OrderListQuery(data);

  //=========== Columns =========//
  const columns: ColumnDef<OrderListType>[] = [
    {
      accessorKey: "order_id",
      header: "Order ID",
      cell: ({ row }) => (
        <span
          className="text-primary hover:underline cursor-pointer font-medium"
          onClick={() => setSelectedOrder(row.original)}
        >
          {row.original.order_id || DEFAULT_VALUES.NOT_AVAILABLE}
        </span>
      ),
    },
    {
      accessorKey: "full_name",
      header: "Account & Customer",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.acno || "No ACNO"}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.full_name || "No Name"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "shipper_address",
      header: "Routing Addresses",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => (
        <div className="flex flex-col gap-2 max-w-[250px]">
          <span
            className="whitespace-pre-wrap break-all text-xs leading-tight"
            title={`Shipper: ${row.original.shipper_address}`}
          >
            <span className="font-semibold text-muted-foreground mr-1">S:</span>
            {row.original.shipper_address || DEFAULT_VALUES.NOT_AVAILABLE}
          </span>
          <span
            className="whitespace-pre-wrap break-all text-xs leading-tight"
            title={`Consignee: ${row.original.consignee_address}`}
          >
            <span className="font-semibold text-muted-foreground mr-1">C:</span>
            {row.original.consignee_address || DEFAULT_VALUES.NOT_AVAILABLE}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "tracking_id",
      header: "Tracking / ASIN",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => (
        <div className="flex flex-col text-xs space-y-1">
          <span>
            <strong className="font-medium text-muted-foreground mr-1">
              TID:
            </strong>{" "}
            {row.original.tracking_id || "N/A"}
          </span>
          <span>
            <strong className="font-medium text-muted-foreground mr-1">
              ASIN:
            </strong>{" "}
            {row.original.asin_id || "N/A"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => {
        const country = row.original.country;
        return (
          <Badge
            variant={
              country?.toLowerCase() as React.ComponentProps<
                typeof Badge
              >["variant"]
            }
          >
            {country || DEFAULT_VALUES.NOT_AVAILABLE}
          </Badge>
        );
      },
    },
    {
      accessorKey: "label_pdf",
      header: "Label",
      cell: ({ row }) => {
        const userId = row.original.user_id;
        const labelPdf = row.original.label_pdf;
        if (!labelPdf)
          return <span className="text-xs text-muted-foreground">N/A</span>;

        const baseUrl = process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL || "";
        const printUrl = `${baseUrl}/user_${userId}/${labelPdf}`;

        return (
          <a
            href={printUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-blue-500 hover:text-blue-600 hover:underline flex items-center gap-1 font-medium"
          >
            View Label
          </a>
        );
      },
    },
    {
      id: "status_date",
      header: "Status & Date",
      cell: ({ row }) => {
        const orderId = row.original.order_id;
        const statusName = row.original.status_name?.toLowerCase();
        const createdDate = row.original.created_date;
        const isMutatingThisRow = confirmingOrderId === orderId;

        const handleStatusUpdate = (endpoint: any, label: string) => {
          setPendingUpdate({
            order: row.original,
            endpoint,
            label,
          });
          setConfirmDialogOpen(true);
        };

        const renderStatusBadge = (name: string, variantName: string) => (
          <Badge
            size="badge-lg"
            variant={
              variantName as React.ComponentProps<typeof Badge>["variant"]
            }
            className="capitalize"
          >
            {name || DEFAULT_VALUES.NOT_AVAILABLE}
          </Badge>
        );

        const renderActions = () => {
          if (user?.role === "customer") {
            return renderStatusBadge(
              row.original.status_name,
              statusName || "default",
            );
          }

          if (!statusName) {
            return renderStatusBadge(DEFAULT_VALUES.NOT_AVAILABLE, "default");
          }

          if (statusName === "new") {
            return (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="h-7 text-xs px-2"
                  onClick={() =>
                    handleStatusUpdate(
                      API_ENDPOINTS.ORDER.ORDER_CONFIRM,
                      "Confirm",
                    )
                  }
                  disabled={isMutatingThisRow}
                >
                  {isMutatingThisRow ? "..." : "Confirm"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs px-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() =>
                    handleStatusUpdate(
                      API_ENDPOINTS.ORDER.ORDER_CANCEL,
                      "Cancel",
                    )
                  }
                  disabled={isMutatingThisRow}
                >
                  {isMutatingThisRow ? "..." : "Cancel"}
                </Button>
              </div>
            );
          }

          if (statusName === "confirmed") {
            return (
              <Button
                size="sm"
                className="h-7 text-xs px-2 bg-blue-600 hover:bg-blue-700"
                onClick={() =>
                  handleStatusUpdate(API_ENDPOINTS.ORDER.ORDER_POSTED, "Post")
                }
                disabled={isMutatingThisRow}
              >
                {isMutatingThisRow ? "Marking..." : "Mark Posted"}
              </Button>
            );
          }

          return renderStatusBadge(row.original.status_name, statusName);
        };

        return (
          <div className="flex flex-col gap-1 items-start">
            {renderActions()}
            <span className="text-[10px] text-muted-foreground mt-1">
              {createdDate ? new Date(createdDate).toLocaleDateString() : ""}
            </span>
          </div>
        );
      },
    },
  ];

  const handleConfirmUpdate = async () => {
    if (!pendingUpdate || !user) return;

    const { order, endpoint, label } = pendingUpdate;
    setConfirmingOrderId(order.order_id);
    setConfirmDialogOpen(false);

    try {
      const promise = updateOrderStatusAsync({
        data: {
          order_id: Number(order.order_id),
          user_id: Number(order.user_id),
          acno: order.acno,
          parent_id: Number(user.id),
          parent_acno: user.acno,
        },
        endpoint: endpoint,
      }).finally(() => {
        setConfirmingOrderId(null);
        setPendingUpdate(null);
      });

      toast.promise(promise, {
        loading: `${label}...`,
        success: (data) => data.message || `Order ${label}ed`,
        error: `Failed to ${label.toLowerCase()} order`,
      });
    } catch (error) {
      console.error("Status Update error:", error);
    }
  };

  //=========== Render Order List =========//
  const renderOrderList = () => {
    if (orderListLoading) {
      return <TableSkeleton />;
    }

    if (orderListError) {
      return (
        <EmptyState message="Failed to load order list. Please try again." />
      );
    }

    return (
      <DataTable columns={columns} data={orderListResponse?.payload || []} />
    );
  };

  return (
    <>
      <Header title="Order List" description="Manage and view all your orders">
        {user?.role === "customer" && (
          <Button size="lg" onClick={() => setIsDialogOpen(true)}>
            Create Order
          </Button>
        )}
      </Header>
      <Card className="shadow-none border-0">
        <CardContent>{renderOrderList()}</CardContent>
      </Card>

      <OrderFormDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <OrderDetailsDialog
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
        order={selectedOrder}
      />
      <ConfirmDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        onConfirm={handleConfirmUpdate}
        title={`Confirm ${pendingUpdate?.label}`}
        description={`Are you sure you want to ${pendingUpdate?.label?.toLowerCase()} this order (${pendingUpdate?.order?.order_id})?`}
        confirmLabel={pendingUpdate?.label || "Confirm"}
        isLoading={!!confirmingOrderId}
      />
    </>
  );
};

export default OrderList;
