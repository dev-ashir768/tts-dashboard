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
import { useForm, Controller, useWatch } from "react-hook-form";
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
import {
  FileText,
  Upload,
  X,
  Trash2,
  AlertCircle,
  ShoppingCart,
  Truck,
  ClipboardList,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useOrderMutation } from "@/hooks/mutations/order.mutations";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import { cn, convertToBase64 } from "@/lib/utils";
import { OrderFormValues, orderSchema } from "@/schema/order.schema";
import { useWarehouseQuery } from "@/hooks/queries/warehouse.queries";
import { useInventoryQuery } from "@/hooks/queries/inventory.queries";
import { singleSelectStyle } from "@/components/shared/react-select-style";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface InventoryOption {
  label: string;
  value: number;
  item: import("@/types/inventory.types").InventoryListType;
}

const OrderFormDialog = ({ open, onOpenChange }: OrderFormDialogProps) => {
  // ====================== Hooks ====================== \\
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [isPdfMode, setIsPdfMode] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("details");
  const [includeInventory, setIncludeInventory] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    trigger,
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
      label_image_1: "",
      label_image_2: "",
      label_image_3: "",
      label_image_4: "",
      label_image_5: "",
      inventory_items: [],
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
        label_image_1: "",
        label_image_2: "",
        label_image_3: "",
        label_image_4: "",
        label_image_5: "",
        inventory_items: [],
      });
    } else if (!open) {
      reset();
    }
  }, [user, open, reset]);

  // ====================== Data Fetcing ====================== \\
  const { data: warehouseListResponse, isLoading: warehouseListLoading } =
    useWarehouseQuery.WarehouseListQuery(userData);

  const { data: inventoryListResponse, isLoading: inventoryListLoading } =
    useInventoryQuery.InventoryListQuery(userData);

  // ====================== Select options ====================== \\
  const shipperAddressOptions = warehouseListResponse?.payload.map((item) => ({
    label: item.address,
    value: item.address,
  }));

  const inventoryOptions = inventoryListResponse?.payload
    .filter((item) => item.status === 1) // Only active items
    .map((item) => ({
      label: `${item.sku_name} (${item.sku_code}) - Stock: ${item.quantity}`,
      value: item.id,
      item: item,
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

  const onImagesSelect = useCallback(
    async (files: File[]) => {
      // Find empty slots
      const emptySlots: (keyof OrderFormValues)[] = [
        "label_image_1",
        "label_image_2",
        "label_image_3",
        "label_image_4",
        "label_image_5",
      ].filter(
        (key) => !control._formValues[key as keyof OrderFormValues],
      ) as (keyof OrderFormValues)[];

      const filesToProcess = files.slice(0, emptySlots.length);

      for (let i = 0; i < filesToProcess.length; i++) {
        const base64 = await convertToBase64(filesToProcess[i]);
        setValue(emptySlots[i], base64);
      }
    },
    [setValue, control],
  );

  const watchInventoryItems =
    useWatch({
      control,
      name: "inventory_items",
    }) || [];

  const addInventoryItem = (selectedOption: InventoryOption | null) => {
    if (!selectedOption) return;
    const item = selectedOption.item;
    const currentItems = [...watchInventoryItems];

    if (currentItems.find((i) => i.sku_id === item.id)) return;

    currentItems.push({
      sku_id: item.id,
      sku_name: item.sku_name,
      sku_code: item.sku_code,
      quantity: 1,
      amount: parseFloat(item.amount),
      description: item.description,
      image: item.image,
    });

    setValue("inventory_items", currentItems);
  };

  const removeInventoryItem = (skuId: number) => {
    const currentItems = watchInventoryItems.filter(
      (item: { sku_id: number }) => item.sku_id !== skuId,
    );
    setValue("inventory_items", currentItems);
  };

  const handleNext = async (step: "logistics" | "products") => {
    let fieldsToValidate: (keyof OrderFormValues)[] = [];

    if (step === "logistics") {
      fieldsToValidate = [
        "tracking_id",
        "asin_id",
        "shipper_address",
        "remarks",
      ];
    } else if (step === "products") {
      if (isPdfMode) {
        fieldsToValidate = ["label_pdf"];
      } else {
        fieldsToValidate = ["consignee_address"];
      }
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setActiveTab(step);
    }
  };

  const updateItemQuantity = (skuId: number, quantity: number) => {
    const currentItems = [...watchInventoryItems];
    const itemIndex = currentItems.findIndex((i) => i.sku_id === skuId);
    if (itemIndex === -1) return;

    // Validate max quantity
    const inventoryItem = inventoryListResponse?.payload.find(
      (i) => i.id === skuId,
    );
    const maxQty = inventoryItem?.quantity || 0;

    if (quantity > maxQty) {
      quantity = maxQty;
    }

    if (quantity < 1) quantity = 1;

    currentItems[itemIndex].quantity = quantity;
    setValue("inventory_items", currentItems);
  };

  // ====================== Form Submit ====================== \\
  const onSubmit = (data: OrderFormValues) => {
    const payload: Partial<OrderFormValues> = { ...data };

    if (!payload.consignee_address) {
      delete payload.consignee_address;
    }
    if (!payload.label_pdf) {
      delete payload.label_pdf;
    }
    // Clean up empty image fields
    [1, 2, 3, 4, 5].forEach((i) => {
      const key = `label_image_${i}` as keyof OrderFormValues;
      if (!payload[key]) {
        delete payload[key];
      }
    });

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
          <Tabs value={activeTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4 pointer-events-none">
              <TabsTrigger value="details" className="gap-2">
                <ClipboardList className="size-4" />
                <span className="hidden sm:inline">Details</span>
              </TabsTrigger>
              <TabsTrigger value="logistics" className="gap-2">
                <Truck className="size-4" />
                <span className="hidden sm:inline">Logistics</span>
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className={cn("gap-2", !includeInventory && "opacity-50")}
              >
                <ShoppingCart className="size-4" />
                <span className="hidden sm:inline">Products</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 outline-none">
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
                        placeholder="Select Shipper/3PL Address *"
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
                    rows={4}
                  />
                </Field>
                {errors.remarks && <FieldError errors={[errors.remarks]} />}
              </FieldGroup>
            </TabsContent>

            <TabsContent value="logistics" className="space-y-4 outline-none">
              <div className="flex flex-col gap-3 pb-2 border-b">
                <div className="flex items-center space-x-2">
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

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-inventory-toggle"
                    checked={includeInventory}
                    onCheckedChange={(checked) => {
                      setIncludeInventory(checked as boolean);
                      if (!checked) {
                        setValue("inventory_items", []);
                      }
                    }}
                  />
                  <label
                    htmlFor="include-inventory-toggle"
                    className="text-sm font-medium leading-none text-primary"
                  >
                    Include products from inventory?
                  </label>
                </div>
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
                  {errors.label_pdf && (
                    <FieldError errors={[errors.label_pdf]} />
                  )}
                </FieldGroup>
              )}

              <div className="space-y-4 border-t pt-4 mt-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">
                    Label Images (Optional - Max 5)
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Attach up to 5 images for the label.
                  </p>
                </div>

                <FileUpload
                  accept="image/*"
                  maxFiles={5}
                  onAccept={onImagesSelect}
                  multiple
                >
                  <FileUploadDropzone className="border-2 border-dashed flex flex-col items-center justify-center p-6 cursor-pointer">
                    <Upload className="size-6 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Upload Images</p>
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
                        Browse Images
                      </Button>
                    </FileUploadTrigger>
                  </FileUploadDropzone>
                </FileUpload>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5].map((i) => {
                    const key = `label_image_${i}` as keyof OrderFormValues;
                    return (
                      <Controller
                        key={key}
                        name={key}
                        control={control}
                        render={({ field }) =>
                          field.value ? (
                            <div className="relative aspect-square rounded-md overflow-hidden border group">
                              <Image
                                src={field.value as string}
                                alt={`Preview ${i}`}
                                className="object-cover w-full h-full"
                                width={100}
                                height={100}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 size-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => field.onChange("")}
                              >
                                <X className="size-3" />
                              </Button>
                            </div>
                          ) : (
                            <></>
                          )
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-4 outline-none">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">
                  Inventory Items (Optional)
                </label>
                <p className="text-xs text-muted-foreground">
                  Select products from your inventory to include in this order.
                </p>
              </div>

              <Select
                options={inventoryOptions}
                onChange={(option) => addInventoryItem(option as InventoryOption | null)}
                formatOptionLabel={(option: InventoryOption) => (
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded overflow-hidden border bg-background shrink-0">
                      {option.item.image ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL}/user_${user?.id}/${option.item.image}`}
                          alt={option.item.sku_name}
                          className="size-full object-cover"
                          width={100}
                          height={100}
                        />
                      ) : (
                        <div className="size-full flex items-center justify-center text-[8px] text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-medium truncate">
                        {option.item.sku_name}
                      </span>
                      <span className="text-[10px] text-muted-foreground truncate">
                        SKU: {option.item.sku_code} | Stock:{" "}
                        {option.item.quantity} | {option.item.amount}
                      </span>
                    </div>
                  </div>
                )}
                placeholder="Search And Add Products..."
                styles={singleSelectStyle}
                isLoading={inventoryListLoading}
                isSearchable
                value={null}
                noOptionsMessage={() => "No products found"}
              />

              {watchInventoryItems.length > 0 && (
                <ScrollArea className="max-h-[300px] pr-4">
                  <div className="space-y-3">
                    {watchInventoryItems.map((item: {
                      sku_id: number;
                      sku_name: string;
                      sku_code: string;
                      quantity: number;
                      amount: number;
                      description?: string;
                      image?: string;
                    }) => {
                      const inventoryItem = inventoryListResponse?.payload.find(
                        (i) => i.id === item.sku_id,
                      );
                      const maxQty = inventoryItem?.quantity || 0;
                      const isOutOfStock = maxQty <= 0;

                      return (
                        <div
                          key={item.sku_id}
                          className="flex items-center gap-3 p-3 rounded-lg border bg-accent/5 relative"
                        >
                          <div className="size-12 rounded bg-muted shrink-0 overflow-hidden border">
                            {item.image ? (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_UPLOAD_API_BASE_URL}/user_1/${item.image}`}
                                alt={item.sku_name}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="size-full flex items-center justify-center text-[10px] text-muted-foreground">
                                No image
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {item.sku_name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              SKU: {item.sku_code} | Price: {item.amount}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end">
                              <label className="text-[10px] font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                                Quantity
                              </label>
                              <div className="flex items-center gap-1">
                                <Input
                                  type="number"
                                  className="w-16 h-8 text-center text-xs"
                                  value={item.quantity}
                                  min={1}
                                  max={maxQty}
                                  onChange={(e) =>
                                    updateItemQuantity(
                                      item.sku_id,
                                      parseInt(e.target.value) || 1,
                                    )
                                  }
                                />
                                <span className="text-[10px] text-muted-foreground">
                                  / {maxQty}
                                </span>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                              onClick={() => removeInventoryItem(item.sku_id)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                          {isOutOfStock && (
                            <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
                              <Badge variant="destructive" className="gap-1">
                                <AlertCircle className="size-3" /> Out of stock
                              </Badge>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </form>
        <ResponsiveDialogFooter className="flex-row justify-between items-center gap-2">
          <ResponsiveDialogClose asChild>
            <Button variant="outline" size="sm" className="px-4">
              Cancel
            </Button>
          </ResponsiveDialogClose>

          <div className="flex items-center gap-2">
            {activeTab !== "details" && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() =>
                  setActiveTab(
                    activeTab === "products" ? "logistics" : "details",
                  )
                }
                className="gap-2"
              >
                <ChevronLeft className="size-4" /> Previous
              </Button>
            )}

            {activeTab === "details" && (
              <Button
                type="button"
                size="sm"
                onClick={() => handleNext("logistics")}
                className="gap-2 px-6"
              >
                Next Step <ChevronRight className="size-4" />
              </Button>
            )}

            {activeTab === "logistics" && (
              <>
                {includeInventory ? (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleNext("products")}
                    className="gap-2 px-6"
                  >
                    Next: Products <ChevronRight className="size-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    form="order-form"
                    size="sm"
                    disabled={createOrderMutation.isPending}
                    className="gap-2 px-6 shadow-md hover:shadow-lg transition-all"
                  >
                    {createOrderMutation.isPending ? (
                      "Creating..."
                    ) : (
                      <>
                        Create Order <ShoppingCart className="size-4" />
                      </>
                    )}
                  </Button>
                )}
              </>
            )}

            {activeTab === "products" && (
              <Button
                type="submit"
                form="order-form"
                size="sm"
                disabled={createOrderMutation.isPending}
                className="gap-2 px-6 shadow-md hover:shadow-lg transition-all"
              >
                {createOrderMutation.isPending ? (
                  "Creating..."
                ) : (
                  <>
                    Create Order <ShoppingCart className="size-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default OrderFormDialog;
