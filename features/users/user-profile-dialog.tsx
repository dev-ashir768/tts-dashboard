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
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
} from "@/components/shared/file-upload";
import { UserProfileFormValues, userProfileSchema } from "@/schema/user.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserMutation } from "@/hooks/mutations/user.mutations";
import { useAuthStore } from "@/store/auth.store";
import { convertToBase64 } from "@/lib/utils";
import Image from "next/image";
import { FileText, Upload, X } from "lucide-react";
import { useUserQuery } from "@/hooks/queries/user.queries";

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserProfileDialog = ({ open, onOpenChange }: UserProfileDialogProps) => {
  // ====================== Hooks ====================== \\
  const { user } = useAuthStore();
  const data = {
    user_id: user ? user.id : null,
    acno: user ? user.acno : null,
    isFetch: open,
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      address: "",
      brand_image: "",
      business_name: "",
      full_name: "",
    },
  });

  // ====================== Data Fetcing ====================== \\
  const { data: userByIdData } = useUserQuery.UserByIdQuery(data);

  React.useEffect(() => {
    if (user && open) {
      reset({
        full_name: userByIdData?.payload[0].full_name,
        business_name: userByIdData?.payload[0].business_name,
        address: userByIdData?.payload[0].address,
        brand_image: userByIdData?.payload[0].brand_image,
      });
    } else if (!open) {
      reset();
    }
  }, [user, open, reset, userByIdData?.payload]);

  // ====================== Mutations ====================== \\
  const userProfileMutation = useUserMutation.UserProfileMutation();

  // ============ Helper Functions ============ \\
  const onFileSelect = React.useCallback(
    async (files: File[]) => {
      if (files.length > 0) {
        const base64 = await convertToBase64(files[0]);
        setValue(`brand_image`, base64);
      }
    },
    [setValue],
  );

  // ====================== Form Submit ====================== \\
  const onSubmit = (data: UserProfileFormValues) => {
    userProfileMutation.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
        reset();
      },
    });
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>User Profile</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <form
          id="user-profile-form"
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FieldGroup className="gap-2">
            <Field>
              <Input
                {...register("full_name")}
                placeholder="Full Name"
                autoComplete="off"
                type="text"
                disabled
              />
            </Field>

            {errors.full_name && <FieldError errors={[errors.full_name]} />}
          </FieldGroup>

          <FieldGroup className="gap-2">
            <Field>
              <Input
                {...register("business_name")}
                placeholder="Business Name *"
                autoComplete="off"
                type="text"
              />
            </Field>

            {errors.business_name && (
              <FieldError errors={[errors.business_name]} />
            )}
          </FieldGroup>

          <FieldGroup className="gap-2">
            <Field className="h-full">
              <Controller
                name="brand_image"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    accept="image/*"
                    maxSize={5 * 1024 * 1024}
                    onAccept={(files) => onFileSelect(files)}
                    className="h-full"
                  >
                    <FileUploadDropzone className="h-full cursor-pointer border-2 border-dashed">
                      {field.value ? (
                        <div className="flex flex-col items-center gap-1">
                          {field.value.startsWith("data:image") ||
                          field.value.startsWith("http") ? (
                            <div className="relative flex items-center gap-2.5 rounded-md border p-0">
                              <div className="relative flex size-20 shrink-0 items-center justify-center rounded border bg-accent/50 p-1">
                                <Image
                                  src={field.value}
                                  alt="Brand Image"
                                  fill
                                  className="size-full object-contain"
                                />
                              </div>
                              <span className="sr-only">
                                {field.value || "Image Attached"}
                              </span>
                              <Button
                                type="button"
                                variant="secondary"
                                size="icon"
                                className="absolute -top-1 -right-1 size-5 rounded-full"
                                onClick={() => field.onChange("")}
                              >
                                <X className="size-3" />
                              </Button>
                            </div>
                          ) : (
                            <FileText className="size-10 text-primary" />
                          )}
                          <p className="text-[10px] font-medium">
                            File Attached
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-center">
                          <Upload className="size-5 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">
                            Drop image here
                          </p>
                          <FileUploadTrigger asChild>
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-xs"
                            >
                              Browse
                            </Button>
                          </FileUploadTrigger>
                        </div>
                      )}
                    </FileUploadDropzone>
                  </FileUpload>
                )}
              />
            </Field>

            {errors.brand_image && <FieldError errors={[errors.brand_image]} />}
          </FieldGroup>

          <FieldGroup className="gap-2">
            <Field>
              <Textarea
                {...register("address")}
                placeholder="Address *"
                autoComplete="off"
                rows={4}
              />
            </Field>

            {errors.address && <FieldError errors={[errors.address]} />}
          </FieldGroup>
        </form>
        <ResponsiveDialogFooter className="mt-2">
          <ResponsiveDialogClose asChild>
            <Button type="submit" variant="secondary">
              Cancel
            </Button>
          </ResponsiveDialogClose>
          <Button
            type="submit"
            form="user-profile-form"
            disabled={userProfileMutation.isPending}
          >
            {userProfileMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default UserProfileDialog;
