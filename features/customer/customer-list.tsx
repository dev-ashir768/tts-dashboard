"use client";

import { DataTable } from "@/components/shared/datatable/datatable";
import EmptyState from "@/components/shared/empty-state";
import Header from "@/components/shared/header";
import TableSkeleton from "@/components/shared/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCustomerMutation } from "@/hooks/mutations/customer.mutations";
import { useCustomerQuery } from "@/hooks/queries/customer.queries";
import { DEFAULT_VALUES, QUERY_KEYS } from "@/lib/constants";
import { customerStatusUpdateProps } from "@/services/customer.service";
import { useAuthStore } from "@/store/auth.store";
import { CustomerListType } from "@/types/customer.types";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback } from "react";
import { toast } from "sonner";

const CustomerList = () => {
  // ====================== Hooks ====================== \\
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
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

  //=========== Mutations =========//
  const customerStatusUpdateMutation =
    useCustomerMutation.CustomerStatusUpdateMutation();

  //=========== Handlers =========//
  const handleCustomerStatusUpdate = useCallback(
    (data: customerStatusUpdateProps) => {
      const promise = customerStatusUpdateMutation.mutateAsync(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              QUERY_KEYS.CUSTOMER.CUSTOMER_LIST,
              ...(user?.acno ? [user.acno] : []),
              ...(user?.id ? [user.id] : []),
            ],
          });
        },
      });

      toast.promise(promise, {
        loading: "Updating customer status...",
        error: "Failed to update customer status!",
      });
    },
    [user, queryClient, customerStatusUpdateMutation],
  );

  //=========== Columns =========//
  const columns: ColumnDef<CustomerListType>[] = [
    {
      accessorKey: "acno",
      header: "Account No",
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const fullName = row.original.acno;
        return fullName || DEFAULT_VALUES.NOT_AVAILABLE;
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
    // {
    //   accessorKey: "address",
    //   header: "Address",
    //   filterFn: "arrIncludesSome",
    //   cell: ({ row }) => {
    //     const address = row.original.address;
    //     return address || DEFAULT_VALUES.NOT_AVAILABLE;
    //   },
    // },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.original.status;
        const customerId = row.original.id;
        const acno = row.original.acno;
        return (
          <Button
            variant={
              isActive
                ? "active"
                : ("inactive" as React.ComponentProps<typeof Button>["variant"])
            }
            size="badge-lg"
            disabled={
              customerStatusUpdateMutation.isPending &&
              customerStatusUpdateMutation.variables?.user_id === customerId
            }
            onClick={() =>
              handleCustomerStatusUpdate({
                user_id: customerId,
                acno: acno,
                status: isActive ? 0 : 1,
              })
            }
          >
            {isActive ? "Active" : "Inactive"}
          </Button>
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
        <EmptyState message="Failed to load customer list. Please try again." />
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
