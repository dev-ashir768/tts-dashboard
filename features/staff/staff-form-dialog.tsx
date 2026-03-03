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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { StaffFormValues, staffSchema } from "@/schema/staff.schema";
import { useStaffMutation } from "@/hooks/mutations/staff.mutations";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";

interface StaffFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StaffFormDialog = ({ open, onOpenChange }: StaffFormDialogProps) => {
  // ====================== Hooks ====================== \\
  const [isVisible, setIsVisible] = React.useState(false);
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      password: "",
      email: "",
      contact_no: "",
      full_name: "",
    },
  });

  const handleTogglePassword = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  // ====================== Data Fetcing ====================== \\
  React.useEffect(() => {
    if (user && open) {
      reset();
    } else if (!open) {
      reset();
    }
  }, [user, open, reset]);

  // ====================== Mutations ====================== \\
  const createStaffMutation = useStaffMutation.CreateStaffMutation();

  // ====================== Form Submit ====================== \\
  const onSubmit = (data: StaffFormValues) => {
    createStaffMutation.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
        reset();
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEYS.STAFF.STAFF_LIST,
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
          <ResponsiveDialogTitle>Create Staff</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Add new staff member
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <form
          id="staff-form"
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
              />
            </Field>

            {errors.full_name && <FieldError errors={[errors.full_name]} />}
          </FieldGroup>

          <FieldGroup className="gap-2">
            <Field>
              <Input
                {...register("contact_no")}
                placeholder="Contact Number"
                autoComplete="off"
                type="text"
              />
            </Field>

            {errors.contact_no && <FieldError errors={[errors.contact_no]} />}
          </FieldGroup>

          <FieldGroup className="gap-2">
            <Field>
              <Input
                {...register("email")}
                placeholder="Email"
                autoComplete="off"
                type="text"
              />
            </Field>

            {errors.email && <FieldError errors={[errors.email]} />}
          </FieldGroup>

          <FieldGroup className="gap-2">
            <Field className="relative">
              <Input
                {...register("password")}
                placeholder="Password"
                autoComplete="off"
                type={isVisible ? "text" : "password"}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleTogglePassword}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-max!"
              >
                {isVisible ? <EyeOff /> : <Eye />}
              </Button>
            </Field>

            {errors.password?.message && (
              <FieldError errors={[errors.password]} />
            )}
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
            form="staff-form"
            disabled={createStaffMutation.isPending}
          >
            {createStaffMutation.isPending ? "Creating..." : "Create"}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default StaffFormDialog;
