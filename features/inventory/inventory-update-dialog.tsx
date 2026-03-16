"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/ui/responsive-dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { useInventoryMutation } from "@/hooks/mutations/inventory.mutations";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import { InventoryListType } from "@/types/inventory.types";
import { singleSelectStyle } from "@/components/shared/react-select-style";

const updateSchema = z.object({
  quantity: z.number().int().nonnegative("Quantity must be at least 0"),
  status: z.number().int().min(0).max(1),
});

type UpdateFormValues = z.infer<typeof updateSchema>;

interface InventoryUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inventory: InventoryListType | null;
}

const statusOptions = [
  { label: "Active", value: 1 },
  { label: "Inactive", value: 0 },
];

const InventoryUpdateDialog = ({
  open,
  onOpenChange,
  inventory,
}: InventoryUpdateDialogProps) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const updateMutation = useInventoryMutation.UpdateInventoryMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      quantity: 0,
      status: 1,
    },
  });

  React.useEffect(() => {
    if (inventory && open) {
      reset({
        quantity: inventory.quantity,
        status: inventory.status,
      });
    }
  }, [inventory, open, reset]);

  const onSubmit = (values: UpdateFormValues) => {
    if (!inventory || !user) return;

    updateMutation.mutate(
      {
        user_id: Number(user.id),
        acno: user.acno,
        sku_id: inventory.id,
        quantity: values.quantity,
        status: values.status,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          queryClient.invalidateQueries({
            queryKey: [
              QUERY_KEYS.INVENTORY.INVENTORY_LIST,
              ...(user?.acno ? [user.acno] : []),
              ...(user?.id ? [user.id] : []),
            ],
          });
        },
      },
    );
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="max-w-md">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Update Inventory</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Update the quantity and status for <strong>{inventory?.sku_name}</strong>.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <form
          id="update-inventory-form"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FieldGroup className="gap-2">
            <label className="text-sm font-medium">Quantity</label>
            <Field>
              <Input
                {...register("quantity", { valueAsNumber: true })}
                type="number"
                placeholder="Quantity"
              />
            </Field>
            {errors.quantity && <FieldError errors={[errors.quantity]} />}
          </FieldGroup>

          <FieldGroup className="gap-2">
            <label className="text-sm font-medium">Status</label>
            <Field>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    options={statusOptions}
                    value={statusOptions.find((opt) => opt.value === field.value)}
                    onChange={(opt) => field.onChange(opt?.value ?? 1)}
                    styles={singleSelectStyle}
                    isSearchable={false}
                  />
                )}
              />
            </Field>
            {errors.status && <FieldError errors={[errors.status]} />}
          </FieldGroup>
        </form>
        <ResponsiveDialogFooter>
          <ResponsiveDialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </ResponsiveDialogClose>
          <Button
            type="submit"
            form="update-inventory-form"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update Inventory"}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default InventoryUpdateDialog;
