"use client";

import { DataTable } from "@/components/shared/datatable/datatable";
import EmptyState from "@/components/shared/empty-state";
import Header from "@/components/shared/header";
import TableSkeleton from "@/components/shared/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOrderQuery } from "@/hooks/queries/order.queries";
import { DEFAULT_VALUES } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import { OrderListType } from "@/types/order.types";
import { useState } from "react";
import { useOrderMutation } from "@/hooks/mutations/order.mutations";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { ColumnDef } from "@tanstack/react-table";
import OrderFormDialog from "./order-form-dialog";

const OrderList = () => {
  const { user } = useAuthStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmingOrderId, setConfirmingOrderId] = useState<number | null>(
    null,
  );
  const queryClient = useQueryClient();

  // Mutations
  const { mutate: updateOrderStatus } =
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
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const orderId = row.original.order_id;
        return orderId || DEFAULT_VALUES.NOT_AVAILABLE;
      },
    },
    {
      accessorKey: "acno",
      header: "Account No",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const acno = row.original.acno;
        return acno || DEFAULT_VALUES.NOT_AVAILABLE;
      },
    },
    {
      accessorKey: "full_name",
      header: "Full Name",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const fullName = row.original.full_name;
        return fullName || DEFAULT_VALUES.NOT_AVAILABLE;
      },
    },
    {
      accessorKey: "tracking_id",
      header: "Tracking ID",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const trackingId = row.original.tracking_id;
        return trackingId || DEFAULT_VALUES.NOT_AVAILABLE;
      },
    },
    {
      accessorKey: "asin_id",
      header: "ASIN ID",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const asinId = row.original.asin_id;
        return asinId || DEFAULT_VALUES.NOT_AVAILABLE;
      },
    },
    {
      accessorKey: "remarks",
      header: "Reamrks",
      cell: ({ row }) => {
        const remarks = row.original.remarks;
        return remarks || DEFAULT_VALUES.NOT_AVAILABLE;
      },
    },
    {
      accessorKey: "country",
      header: "Country",
      filterFn: "arrIncludesSome",
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
      accessorKey: "status_name",
      header: "Status",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const statusName = row.original.status_name;
        return (
          <Badge
            variant={
              statusName?.toLowerCase() as React.ComponentProps<
                typeof Badge
              >["variant"]
            }
          >
            {statusName || DEFAULT_VALUES.NOT_AVAILABLE}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_date",
      header: "Created Date",
      cell: ({ row }) => {
        const createdDate = row.original.created_date;
        if (!createdDate) return DEFAULT_VALUES.NOT_AVAILABLE;
        return new Date(createdDate).toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const orderId = row.original.order_id;
        const statusName = row.original.status_name;
        const canConfirm = statusName?.toLowerCase() === "new" && user;

        const handleConfirmClick = () => {
          if (!user) return;
          setConfirmingOrderId(orderId);
          updateOrderStatus(
            {
              order_id: Number(orderId),
              user_id: Number(row.original.user_id),
              acno: row.original.acno,
              parent_id: Number(user.id),
              parent_acno: user.acno,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: [QUERY_KEYS.ORDER.ORDER_LIST],
                });
              },
              onSettled: () => {
                setConfirmingOrderId(null);
              },
            },
          );
        };

        const isMutatingThisRow = confirmingOrderId === orderId;

        return canConfirm ? (
          <Button
            size="sm"
            onClick={handleConfirmClick}
            disabled={isMutatingThisRow}
          >
            {isMutatingThisRow ? "Confirming..." : "Mark Confirm"}
          </Button>
        ) : null;
      },
    },
  ];

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
    </>
  );
};

export default OrderList;
