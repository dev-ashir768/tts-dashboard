"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/ui/responsive-dialog";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
} from "@/components/shared/file-upload";
import { Upload, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS, COUNTRY } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import { convertToBase64 } from "@/lib/utils";
import { useWarehouseQuery } from "@/hooks/queries/warehouse.queries";
import { singleSelectStyle } from "@/components/shared/react-select-style";
import { InventoryFormValues, inventorySchema } from "@/schema/inventory.schema";
import { useInventoryMutation } from "@/hooks/mutations/inventory.mutations";

interface InventoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InventoryFormDialog = ({ open, onOpenChange }: InventoryFormDialogProps) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<InventoryFormValues>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      user_id: user?.id,
      acno: user?.acno,
      warehouse_id: undefined,
      sku_name: "",
      sku_code: "",
      quantity: undefined,
      amount: undefined,
      description: "",
      image: "",
      country: undefined,
    },
  });

  const userData = {
    user_id: user ? user.id : null,
    acno: user ? user.acno : null,
  };

  const { data: warehouseListResponse, isLoading: warehouseListLoading } =
    useWarehouseQuery.WarehouseListQuery(userData);

  const warehouseOptions = warehouseListResponse?.payload
    .filter((item) => item.status === 1)
    .map((item) => ({
      label: item.address,
      value: item.id,
    }));

  const countryOptions = Object.entries(COUNTRY).map(([key, value]) => ({
    label: key,
    value,
  }));

  const createInventoryMutation = useInventoryMutation.CreateInventoryMutation();

  React.useEffect(() => {
    if (user && open) {
      reset({
        user_id: user?.id || 0,
        acno: user?.acno || "",
        warehouse_id: 0,
        sku_name: "",
        sku_code: "",
        quantity: 0,
        amount: 0,
        description: "",
        image: "",
        country: undefined,
      });
    }
  }, [user, open, reset]);

  const onFileSelect = useCallback(
    async (files: File[]) => {
      if (files.length > 0) {
        const base64 = await convertToBase64(files[0]);
        setValue("image", base64);
      }
    },
    [setValue],
  );

  const onSubmit = (data: InventoryFormValues) => {
    createInventoryMutation.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
        reset();
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEYS.INVENTORY.INVENTORY_LIST,
            ...(user?.acno ? [user.acno] : []),
            ...(user?.id ? [user.id] : []),
          ],
        });
      },
    });
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="max-w-2xl">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Create New Inventory</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Exnter the details for your new inventory item.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <form
          id="inventory-form"
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldGroup className="gap-2">
              <Field>
                <Input
                  {...register("sku_name")}
                  placeholder="SKU Name *"
                  autoComplete="off"
                />
              </Field>
              {errors.sku_name && <FieldError errors={[errors.sku_name]} />}
            </FieldGroup>

            <FieldGroup className="gap-2">
              <Field>
                <Input
                  {...register("sku_code")}
                  placeholder="SKU Code *"
                  autoComplete="off"
                />
              </Field>
              {errors.sku_code && <FieldError errors={[errors.sku_code]} />}
            </FieldGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldGroup className="gap-2">
              <Field>
                <Input
                  {...register("quantity", { valueAsNumber: true })}
                  placeholder="Quantity *"
                  type="number"
                />
              </Field>
              {errors.quantity && <FieldError errors={[errors.quantity]} />}
            </FieldGroup>

            <FieldGroup className="gap-2">
              <Field>
                <Input
                  {...register("amount", { valueAsNumber: true })}
                  placeholder="Amount *"
                  type="number"
                  step="0.01"
                />
              </Field>
              {errors.amount && <FieldError errors={[errors.amount]} />}
            </FieldGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldGroup className="gap-2">
              <Field>
                <Controller
                  name="warehouse_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={warehouseOptions}
                      value={
                        warehouseOptions?.find(
                          (item) => item.value === field.value,
                        ) || null
                      }
                      onChange={(option) =>
                        field.onChange(option ? option.value : 0)
                      }
                      placeholder="Select Warehouse *"
                      isDisabled={createInventoryMutation.isPending}
                      styles={singleSelectStyle}
                      isLoading={warehouseListLoading}
                      isClearable
                    />
                  )}
                />
              </Field>
              {errors.warehouse_id && (
                <FieldError errors={[errors.warehouse_id]} />
              )}
            </FieldGroup>

            <FieldGroup className="gap-2">
              <Field>
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
                        field.onChange(option ? option.value : undefined)
                      }
                      placeholder="Select Country *"
                      isDisabled={createInventoryMutation.isPending}
                      styles={singleSelectStyle}
                      isClearable
                    />
                  )}
                />
              </Field>
              {errors.country && <FieldError errors={[errors.country]} />}
            </FieldGroup>
          </div>

          <FieldGroup className="gap-2">
            <Field>
              <Textarea
                {...register("description")}
                placeholder="Description"
                rows={3}
              />
            </Field>
            {errors.description && <FieldError errors={[errors.description]} />}
          </FieldGroup>

          <FieldGroup className="gap-2">
            <Field>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    accept="image/*"
                    maxSize={2 * 1024 * 1024}
                    onAccept={onFileSelect}
                  >
                    <FileUploadDropzone className="border-2 border-dashed flex flex-col items-center justify-center p-6 cursor-pointer">
                      {field.value ? (
                        <div className="relative w-32 aspect-square rounded-md overflow-hidden border">
                          <Image
                            src={field.value}
                            alt="Preview"
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 size-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              field.onChange("");
                            }}
                          >
                            <X className="size-3" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="size-6 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">Upload SKU Image</p>
                          <p className="text-xs text-muted-foreground">
                            Drag & drop or click to browse
                          </p>
                          <FileUploadTrigger asChild>
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-xs mt-2"
                              type="button"
                            >
                              Browse Files
                            </Button>
                          </FileUploadTrigger>
                        </>
                      )}
                    </FileUploadDropzone>
                  </FileUpload>
                )}
              />
            </Field>
            {errors.image && <FieldError errors={[errors.image]} />}
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
            form="inventory-form"
            disabled={createInventoryMutation.isPending}
          >
            {createInventoryMutation.isPending ? "Creating..." : "Create Inventory"}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default InventoryFormDialog;
