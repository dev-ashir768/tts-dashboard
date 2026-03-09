"use client";

import React, { useCallback } from "react";
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
import { FileText, Upload, X } from "lucide-react";
import { useOrderMutation } from "@/hooks/mutations/order.mutations";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import { convertToBase64 } from "@/lib/utils";
import { OrderFormValues, orderSchema } from "@/schema/order.schema";
import { useWarehouseQuery } from "@/hooks/queries/warehouse.queries";
import { singleSelectStyle } from "@/components/shared/react-select-style";
import { Checkbox } from "@/components/ui/checkbox";

interface OrderFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderFormDialog = ({ open, onOpenChange }: OrderFormDialogProps) => {
  // ====================== Hooks ====================== \\
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [isPdfMode, setIsPdfMode] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      tracking_id: "",
      asin_id: "",
      shipper_address: "",
      consignee_address: "",
      label_pdf: "",
      remarks: "",
    },
  });

  const userData = {
    user_id: user ? user.id : null,
    acno: user ? user.acno : null,
  };

  // ====================== Data Fetching ====================== \\
  React.useEffect(() => {
    if (user && open) {
      reset({
        user_id: user?.id || undefined,
        acno: user?.acno || undefined,
        tracking_id: "",
        asin_id: "",
        shipper_address: "",
        consignee_address: "",
        label_pdf: "",
        remarks: "",
      });
    } else if (!open) {
      reset();
    }
  }, [user, open, reset]);

  // ====================== Data Fetcing ====================== \\
  const { data: warehouseListResponse, isLoading: warehouseListLoading } =
    useWarehouseQuery.WarehouseListQuery(userData);

  // ====================== Select options ====================== \\
  const shipperAddressOptions = warehouseListResponse?.payload.map((item) => ({
    label: item.address,
    value: item.address,
  }));

  // ====================== Mutations ====================== \\
  const createOrderMutation = useOrderMutation.CreateOrderMutation();

  // ============ Helper Functions ============ \\
  const onFileSelect = useCallback(
    async (files: File[]) => {
      if (files.length > 0) {
        const base64 = await convertToBase64(files[0]);
        setValue(`label_pdf`, base64);
      }
    },
    [setValue],
  );

  // ====================== Form Submit ====================== \\
  const onSubmit = (data: OrderFormValues) => {
    const payload: Partial<OrderFormValues> = { ...data };

    if (!payload.consignee_address) {
      delete payload.consignee_address;
    }
    if (!payload.label_pdf) {
      delete payload.label_pdf;
    }

    createOrderMutation.mutate(payload as OrderFormValues, {
      onSuccess: () => {
        onOpenChange(false);
        reset();
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEYS.ORDER.ORDER_LIST,
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
          <ResponsiveDialogTitle>Create New Order</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Enter the details for your new order and attach the label PDF.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <form
          id="order-form"
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldGroup className="gap-2">
              <Field>
                <Input
                  {...register("tracking_id")}
                  placeholder="Tracking ID *"
                  autoComplete="off"
                  type="text"
                />
              </Field>
              {errors.tracking_id && (
                <FieldError errors={[errors.tracking_id]} />
              )}
            </FieldGroup>

            <FieldGroup className="gap-2">
              <Field>
                <Input
                  {...register("asin_id")}
                  placeholder="ASIN ID *"
                  autoComplete="off"
                  type="text"
                />
              </Field>
              {errors.asin_id && <FieldError errors={[errors.asin_id]} />}
            </FieldGroup>
          </div>

          <FieldGroup className="gap-2">
            <Field>
              <Controller
                name="shipper_address"
                control={control}
                render={({ field }) => (
                  <Select
                    options={shipperAddressOptions}
                    value={
                      shipperAddressOptions?.find(
                        (item) => item.value === field.value,
                      ) || null
                    }
                    onChange={(option) =>
                      field.onChange(option ? option.value : "")
                    }
                    placeholder="Select Shipper Address *"
                    isDisabled={createOrderMutation.isPending}
                    styles={singleSelectStyle}
                    isLoading={warehouseListLoading}
                    isClearable
                    isSearchable
                  />
                )}
              />
            </Field>
            {errors.shipper_address && (
              <FieldError errors={[errors.shipper_address]} />
            )}
          </FieldGroup>

          <FieldGroup className="gap-2">
            <Field>
              <Textarea
                {...register("remarks")}
                placeholder="Remarks *"
                autoComplete="off"
                rows={3}
              />
            </Field>
            {errors.remarks && (
              <FieldError errors={[errors.remarks]} />
            )}
          </FieldGroup>
          <div className="flex items-center space-x-2 pt-2 pb-1">
            <Checkbox
              id="upload-mode-toggle"
              checked={isPdfMode}
              onCheckedChange={(checked) => {
                setIsPdfMode(checked as boolean);
                if (checked) {
                  setValue("consignee_address", "");
                } else {
                  setValue("label_pdf", "");
                }
              }}
            />
            <label
              htmlFor="upload-mode-toggle"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have a PDF Label instead of a Consignee Address
            </label>
          </div>

          {!isPdfMode ? (
            <FieldGroup className="gap-2">
              <Field>
                <Textarea
                  {...register("consignee_address")}
                  placeholder="Consignee Address *"
                  autoComplete="off"
                  rows={3}
                />
              </Field>
              {errors.consignee_address && (
                <FieldError errors={[errors.consignee_address]} />
              )}
            </FieldGroup>
          ) : (
            <FieldGroup className="gap-2">
              <Field className="h-full">
                <Controller
                  name="label_pdf"
                  control={control}
                  render={({ field }) => (
                    <FileUpload
                      accept="application/pdf"
                      maxSize={5 * 1024 * 1024}
                      onAccept={(files) => onFileSelect(files)}
                      className="h-full"
                    >
                      <FileUploadDropzone className="h-full cursor-pointer border-2 border-dashed flex items-center justify-center p-6">
                        {field.value ? (
                          <div className="flex flex-col items-center gap-1">
                            <div className="relative flex items-center gap-2.5 rounded-md border p-4 bg-accent/20">
                              <FileText className="size-10 text-destructive" />
                              <span className="text-sm font-medium">
                                PDF Attached
                              </span>
                              <Button
                                type="button"
                                variant="secondary"
                                size="icon"
                                className="absolute -top-3 -right-3 size-6 rounded-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  field.onChange("");
                                }}
                              >
                                <X className="size-3" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-1 text-center">
                            <Upload className="size-6 text-muted-foreground mb-2" />
                            <p className="text-sm font-medium">
                              Upload Label PDF
                            </p>
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
                          </div>
                        )}
                      </FileUploadDropzone>
                    </FileUpload>
                  )}
                />
              </Field>
              {errors.label_pdf && <FieldError errors={[errors.label_pdf]} />}
              {errors.root && (
                <FieldError
                  errors={[
                    {
                      message: errors.root.message as string,
                    },
                  ]}
                />
              )}
            </FieldGroup>
          )}
        </form>
        <ResponsiveDialogFooter>
          <ResponsiveDialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </ResponsiveDialogClose>
          <Button
            type="submit"
            form="order-form"
            disabled={createOrderMutation.isPending}
          >
            {createOrderMutation.isPending ? "Submitting..." : "Create Order"}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default OrderFormDialog;
