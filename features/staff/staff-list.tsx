"use client";

import { DataTable } from "@/components/shared/datatable/datatable";
import EmptyState from "@/components/shared/empty-state";
import Header from "@/components/shared/header";
import TableSkeleton from "@/components/shared/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DEFAULT_VALUES } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import { StaffListType } from "@/types/staff.types";
import { ColumnDef } from "@tanstack/react-table";
import { useStaffQuery } from "@/hooks/queries/staff.queries";

const StaffList = () => {
  // ====================== Hooks ====================== \\
  const { user } = useAuthStore();
  const data = {
    user_id: user ? user.id : null,
    acno: user ? user.acno : null,
  };
  //========== Data Fetching ==========
  const {
    data: staffList,
    isLoading: staffListLoading,
    isError: staffListError,
  } = useStaffQuery.StaffListQuery(data);

  //=========== Columns =========//
  const columns: ColumnDef<StaffListType>[] = [
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
      accessorKey: "business_name",
      header: "Business Name",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const businessName = row.original.business_name;
        return businessName || DEFAULT_VALUES.NOT_AVAILABLE;
      },
    },
    {
      accessorKey: "address",
      header: "Address",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const address = row.original.address;
        return address || DEFAULT_VALUES.NOT_AVAILABLE;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.original.status;
        return (
          <Badge
            variant={
              isActive
                ? "active"
                : ("inactive" as React.ComponentProps<typeof Badge>["variant"])
            }
            size="badge-lg"
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
  ];

  //=========== Render Holiday List =========//
  const renderStaffList = () => {
    if (staffListLoading) {
      return <TableSkeleton />;
    }

    if (staffListError) {
      return (
        <EmptyState message="Failed to load staff list. Please try again." />
      );
    }

    return <DataTable columns={columns} data={staffList?.payload || []} />;
  };
  return (
    <>
      <Header title="Staff List" description="Manage your staff" />
      <Card className="shadow-none border-0">
        <CardContent>{renderStaffList()}</CardContent>
      </Card>
    </>
  );
};

export default StaffList;
