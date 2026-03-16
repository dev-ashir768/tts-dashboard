"use client";

import { DataTable } from "@/components/shared/datatable/datatable";
import EmptyState from "@/components/shared/empty-state";
import Header from "@/components/shared/header";
import TableSkeleton from "@/components/shared/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useInventoryQuery } from "@/hooks/queries/inventory.queries";
import { useAuthStore } from "@/store/auth.store";
import { InventoryListType } from "@/types/inventory.types";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { InventoryDetailsDialog } from "./inventory-details-dialog";
import { Button } from "@/components/ui/button";
import InventoryFormDialog from "./inventory-form-dialog";
import InventoryUpdateDialog from "./inventory-update-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal } from "lucide-react";

const InventoryList = () => {
  const { user } = useAuthStore();
  const [selectedInventory, setSelectedInventory] =
    useState<InventoryListType | null>(null);
  const [selectedUpdateInventory, setSelectedUpdateInventory] =
    useState<InventoryListType | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const dataProps = {
    user_id: user ? Number(user.id) : null,
    acno: user?.acno || null,
  };

  const {
    data: inventoryListResponse,
    isLoading,
    isError,
  } = useInventoryQuery.InventoryListQuery(dataProps);

  const columns: ColumnDef<InventoryListType>[] = [
    {
      accessorKey: "sku_name",
      header: "SKU Name",
      cell: ({ row }) => (
        <span
          className="font-medium cursor-pointer hover:underline underline-offset-4 decoration-primary/50 transition-all"
          onClick={() => setSelectedInventory(row.original)}
        >
          {row.getValue("sku_name")}
        </span>
      ),
    },
    {
      accessorKey: "sku_code",
      header: "SKU Code",
    },
    {
      accessorKey: "warehouse_id",
      header: "Warehouse",
      cell: ({ row }) => `WH-${row.getValue("warehouse_id")}`,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => `$${row.getValue("amount")}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as number;
        return (
          <Badge variant={status === 1 ? "active" : "inactive"}>
            {status === 1 ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const inventory = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => setSelectedUpdateInventory(inventory)}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const renderContent = () => {
    if (isLoading) {
      return <TableSkeleton />;
    }

    if (isError) {
      return (
        <EmptyState message="Failed to load inventory list. Please try again." />
      );
    }

    return (
      <DataTable
        columns={columns}
        data={inventoryListResponse?.payload || []}
      />
    );
  };

  return (
    <>
      <Header
        title="Inventory List"
        description="View and manage all inventory items"
      >
        <Button onClick={() => setIsFormOpen(true)}>Create Inventory</Button>
      </Header>
      <Card className="shadow-none border-0">
        <CardContent>{renderContent()}</CardContent>
      </Card>

      <InventoryDetailsDialog
        open={!!selectedInventory}
        onOpenChange={(open) => !open && setSelectedInventory(null)}
        inventory={selectedInventory}
      />
      <InventoryFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} />
      <InventoryUpdateDialog
        open={!!selectedUpdateInventory}
        onOpenChange={(open) => !open && setSelectedUpdateInventory(null)}
        inventory={selectedUpdateInventory}
      />
    </>
  );
};

export default InventoryList;
