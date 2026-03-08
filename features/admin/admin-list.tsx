"use client";

import { DataTable } from "@/components/shared/datatable/datatable";
import EmptyState from "@/components/shared/empty-state";
import Header from "@/components/shared/header";
import TableSkeleton from "@/components/shared/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAdminQuery } from "@/hooks/queries/admin.queries";
import { DEFAULT_VALUES } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import { AdminListType } from "@/types/admin.types";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

const AdminList = () => {
  // ====================== Hooks ====================== \\
  const { user } = useAuthStore();

  const data = {
    user_id: user ? user.id : null,
    acno: user ? user.acno : null,
  };

  //========== Data Fetching ==========
  const {
    data: adminList,
    isLoading: adminListLoading,
    isError: adminListError,
  } = useAdminQuery.AdminListQuery(data);

  //=========== Columns =========//
  const columns: ColumnDef<AdminListType>[] = [
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
      accessorKey: "email",
      header: "Email",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const email = row.original.email;
        return email || DEFAULT_VALUES.NOT_AVAILABLE;
      },
    },
    {
      accessorKey: "contact_no",
      header: "Contact No",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const contactNo = row.original.contact_no;
        return contactNo || DEFAULT_VALUES.NOT_AVAILABLE;
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
  ];

  //=========== Render Holiday List =========//
  const renderAdminList = () => {
    if (adminListLoading) {
      return <TableSkeleton />;
    }

    if (adminListError) {
      return (
        <EmptyState message="Failed to load admin list. Please try again." />
      );
    }

    return <DataTable columns={columns} data={adminList?.payload || []} />;
  };

  return (
    <>
      <Header title="Admin List" description="Manage your admin" />

      <Card className="shadow-none border-0">
        <CardContent>{renderAdminList()}</CardContent>
      </Card>
    </>
  );
};

export default AdminList;
