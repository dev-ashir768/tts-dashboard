"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/ui/responsive-dialog";
import { useCallback, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  ChangePasswordFormValues,
  changePasswordSchema,
} from "@/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUserMutation } from "@/hooks/mutations/user.mutations";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChangePasswordDialog = ({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) => {
  // ====================== Hooks ====================== \\
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isNewPassword, setIsNewPassoword] = useState<boolean>(false);

  const handleTogglePassword = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const handleToggleNewPassword = useCallback(() => {
    setIsNewPassoword((prev) => !prev);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
    },
  });

  // ====================== Mutations ====================== \\
  const changePasswordMutation = useUserMutation.ChangePasswordMutation();

  // ====================== Form Submit ====================== \\
  const onSubmit = (data: ChangePasswordFormValues) => {
    changePasswordMutation.mutate(data, {
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
          <ResponsiveDialogTitle>Change Password</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Make changes to your password here. Click save when you&apos;re
            done.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <form
          id="change-password-form"
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FieldGroup className="gap-2">
            <Field className="relative">
              <Input
                {...register("old_password")}
                placeholder="Enter old password"
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
            {errors.old_password && (
              <FieldError errors={[errors.old_password]} />
            )}
          </FieldGroup>

          <FieldGroup className="gap-2">
            <Field className="relative">
              <Input
                {...register("new_password")}
                placeholder="Enter new password"
                type={isNewPassword ? "text" : "password"}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleToggleNewPassword}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-max!"
              >
                {isNewPassword ? <EyeOff /> : <Eye />}
              </Button>
            </Field>
            {errors.new_password && (
              <FieldError errors={[errors.new_password]} />
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
            form="change-password-form"
            disabled={changePasswordMutation.isPending}
          >
            {changePasswordMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};

export default ChangePasswordDialog;
