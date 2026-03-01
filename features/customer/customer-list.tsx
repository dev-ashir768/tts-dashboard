"use client";

import { DataTable } from "@/components/shared/datatable/datatable";
import EmptyState from "@/components/shared/empty-state";
import Header from "@/components/shared/header";
import TableSkeleton from "@/components/shared/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCustomerQuery } from "@/hooks/queries/customer.queries";
import { DEFAULT_VALUES } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import { CustomerListType } from "@/types/customer.types";
import { ColumnDef } from "@tanstack/react-table";

const CustomerList = () => {
  // ====================== Hooks ====================== \\
  const { user } = useAuthStore();
  const data = {
    user_id: user ? user.id : null,
    acno: user ? user.acno : null,
  };
  //========== Data Fetching ==========
  const {
    data: customerList,
    isLoading: customerListLoading,
    isError: customerListError,
  } = useCustomerQuery.CustomerListQuery(data);

  //=========== Columns =========//
  const columns: ColumnDef<CustomerListType>[] = [
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
  const renderCustomerList = () => {
    if (customerListLoading) {
      return <TableSkeleton />;
    }

    if (customerListError) {
      return (
        <EmptyState message="Failed to load holiday form. Please try again." />
      );
    }

    return <DataTable columns={columns} data={customerList?.payload || []} />;
  };
  return (
    <>
      <Header title="Customer List" description="Manage your customers" />
      <Card className="shadow-none border-0">
        <CardContent>{renderCustomerList()}</CardContent>
      </Card>
    </>
  );
};

export default CustomerList;
