"use client";

import React from "react";
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/ui/responsive-dialog";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Select from "react-select";
import { useWarehouseMutation } from "@/hooks/mutations/warehouse.mutations";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS, COUNTRY } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import {
  WarehouseFormValues,
  warehouseSchema,
} from "@/schema/warehouse.schema";
import { singleSelectStyle } from "@/components/shared/react-select-style";

interface WarehouseFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WarehouseFormDialog = ({
  open,
  onOpenChange,
}: WarehouseFormDialogProps) => {
  // ====================== Hooks ====================== \\
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<WarehouseFormValues>({
    resolver: zodResolver(warehouseSchema),
    defaultValues: {
      address: "",
      country: undefined,
    },
  });

  React.useEffect(() => {
    if (user && open) {
      reset({
        user_id: user?.id || undefined,
        acno: user?.acno || undefined,
      });
    } else if (!open) {
      reset();
    }
  }, [user, open, reset]);

  // ====================== Select options ====================== \\
  const countryOptions = Object.entries(COUNTRY).map(([key, value]) => ({
    label: key,
    value,
  }));

  // ====================== Mutations ====================== \\
  const createWarehouseMutation =
    useWarehouseMutation.CreateWarehouseMutation();

  // ====================== Form Submit ====================== \\
  const onSubmit = (data: WarehouseFormValues) => {
    createWarehouseMutation.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
        reset();
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEYS.WAREHOUSE.WAREHOUSE_LIST,
            ...(user?.acno ? [user.acno] : []),
            ...(user?.id ? [user.id] : []),
          ],
        });
      },
    });
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Add Location</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Add a new warehouse location mapping
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <form
          id="warehouse-form"
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FieldGroup className="gap-2">
            <Field>
              <Textarea
                {...register("address")}
                placeholder="Location Mapping / Address *"
                autoComplete="off"
                rows={4}
              />
            </Field>

            {errors.address && <FieldError errors={[errors.address]} />}
          </FieldGroup>

          <FieldGroup className="gap-2">
            <Field className="w-full">
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    options={countryOptions}
                    value={
                      countryOptions?.find(
                        (item) => item.value === field.value,
                      ) || null
                    }
                    onChange={(option) =>
                      field.onChange(option ? option.value : null)
                    }
                    placeholder="Select Country"
                    isDisabled={createWarehouseMutation.isPending}
                    styles={singleSelectStyle}
                    isClearable
                    isSearchable
                  />
                )}
              />
            </Field>

            {errors.country && <FieldError errors={[errors.country]} />}
          </FieldGroup>
        </form>
        <ResponsiveDialogFooter className="mt-2">
          <ResponsiveDialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </ResponsiveDialogClose>
          <Button
            type="submit"
            form="warehouse-form"
            disabled={createWarehouseMutation.isPending}
          >
            {createWarehouseMutation.isPending ? "Creating..." : "Create"}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default WarehouseFormDialog;
