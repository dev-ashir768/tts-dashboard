"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/shared/datatable/datatable";
import EmptyState from "@/components/shared/empty-state";
import Header from "@/components/shared/header";
import TableSkeleton from "@/components/shared/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWarehouseQuery } from "@/hooks/queries/warehouse.queries";
import { DEFAULT_VALUES } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import { WarehouseListType } from "@/types/warehouse.types";
import { ColumnDef } from "@tanstack/react-table";
import WarehouseFormDialog from "./warehouse-form-dialog";

const WarehouseList = () => {
  // ====================== Hooks ====================== \\
  const { user } = useAuthStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const data = {
    user_id: user ? user.id : null,
    acno: user ? user.acno : null,
  };

  //========== Data Fetching ==========
  const {
    data: warehouseListResponse,
    isLoading: warehouseListLoading,
    isError: warehouseListError,
  } = useWarehouseQuery.WarehouseListQuery(data);

  //=========== Columns =========//
  const columns: ColumnDef<WarehouseListType>[] = [
    {
      accessorKey: "address",
      header: "Location Mapping / Address",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const address = row.original.address;
        return address || DEFAULT_VALUES.NOT_AVAILABLE;
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
      accessorKey: "status",
      header: "Status",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Button
            variant={
              status === 1
                ? "active"
                : ("inactive" as React.ComponentProps<typeof Button>["variant"])
            }
            size="badge-lg"
          >
            {status === 1 ? "Active" : "Inactive"}
          </Button>
        );
      },
    },
    {
      accessorKey: "created_date",
      header: "Created Date",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const createdDate = row.original.created_date;
        if (!createdDate) return DEFAULT_VALUES.NOT_AVAILABLE;
        return new Date(createdDate).toLocaleDateString();
      },
    },
  ];

  //=========== Render Warehouse List =========//
  const renderWarehouseList = () => {
    if (warehouseListLoading) {
      return <TableSkeleton />;
    }

    if (warehouseListError) {
      return (
        <EmptyState message="Failed to load warehouse mappings. Please try again." />
      );
    }

    return (
      <DataTable
        columns={columns}
        data={warehouseListResponse?.payload || []}
      />
    );
  };

  return (
    <>
      <Header
        title="Location Mapping"
        description="Manage and view your warehouse location mappings"
      >
        {user?.role === "super_admin" && (
          <Button size="lg" onClick={() => setIsDialogOpen(true)}>
            Add Location
          </Button>
        )}
      </Header>

      <Card className="shadow-none border-0">
        <CardContent>{renderWarehouseList()}</CardContent>
      </Card>

      <WarehouseFormDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default WarehouseList;
