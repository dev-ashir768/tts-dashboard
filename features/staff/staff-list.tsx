"use client";

import { DataTable } from "@/components/shared/datatable/datatable";
import EmptyState from "@/components/shared/empty-state";
import Header from "@/components/shared/header";
import TableSkeleton from "@/components/shared/table-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { DEFAULT_VALUES, QUERY_KEYS } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import { StaffListType } from "@/types/staff.types";
import { ColumnDef } from "@tanstack/react-table";
import { useStaffQuery } from "@/hooks/queries/staff.queries";
import { Button } from "@/components/ui/button";
import { useStaffMutation } from "@/hooks/mutations/staff.mutations";
import { staffStatusUpdateProps } from "@/services/staff.service";
import { useCallback } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import StaffFormDialog from "./staff-form-dialog";
import React from "react";
import { Badge } from "@/components/ui/badge";

const StaffList = () => {
  // ====================== Hooks ====================== \\
  const { user } = useAuthStore();
  const [isStaffFormDialogOpen, setIsStaffFormDialogOpen] =
    React.useState(false);
  const queryClient = useQueryClient();
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

  //=========== Mutations =========//
  const staffStatusUpdateMutation =
    useStaffMutation.StaffStatusUpdateMutation();

  //=========== Handlers =========//
  const handleStaffStatusUpdate = useCallback(
    (data: staffStatusUpdateProps) => {
      const promise = staffStatusUpdateMutation.mutateAsync(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [
              QUERY_KEYS.STAFF.STAFF_LIST,
              ...(user?.acno ? [user.acno] : []),
              ...(user?.id ? [user.id] : []),
            ],
          });
        },
      });

      toast.promise(promise, {
        loading: "Updating staff status...",
        error: "Failed to update staff status!",
      });
    },
    [user, queryClient, staffStatusUpdateMutation],
  );

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
      cell: ({ row }) => {
        const isActive = row.original.status;
        const staffId = row.original.id;
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
              staffStatusUpdateMutation.isPending &&
              staffStatusUpdateMutation.variables?.user_id === staffId
            }
            onClick={() =>
              handleStaffStatusUpdate({
                user_id: staffId,
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
      <Header title="Staff List" description="Manage your staff">
        {user?.role === "admin" && (
          <Button size="lg" onClick={() => setIsStaffFormDialogOpen(true)}>
            Add Staff
          </Button>
        )}
      </Header>

      <Card className="shadow-none border-0">
        <CardContent>{renderStaffList()}</CardContent>
      </Card>

      <StaffFormDialog
        open={isStaffFormDialogOpen}
        onOpenChange={setIsStaffFormDialogOpen}
      />
    </>
  );
};

export default StaffList;
