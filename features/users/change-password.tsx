"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  ChangePasswordFormValues,
  changePasswordSchema,
} from "@/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUserMutation } from "@/hooks/mutations/user.mutation";

interface ChangePasswordProps {
  initialData?: Partial<ChangePasswordFormValues>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChangePassword = ({
  initialData,
  open,
  onOpenChange,
}: ChangePasswordProps) => {
  // ====================== Hooks ====================== \\
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isNewPassword, setIsNewPassoword] = useState<boolean>(false);

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
  const changePasswordMutation = useUserMutation.changePasswordMutation();

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
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FieldGroup className="gap-2">
            <Field>
              <FieldLabel>
                Old Password <span className="text-red-500">*</span>
              </FieldLabel>

              <div className="relative">
                <Input
                  {...register("old_password")}
                  placeholder="Enter old password"
                  type={isVisible ? "text" : "password"}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => setIsVisible((prev) => !prev)}
                  className="absolute top-1/2 right-0 -translate-y-1/2 hover:bg-transparent"
                >
                  {isVisible ? <EyeIcon /> : <EyeOffIcon />}
                  <span className="sr-only">
                    {isVisible ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>

              {errors.old_password && (
                <FieldError errors={[errors.old_password]} />
              )}
            </Field>
          </FieldGroup>

          <FieldGroup className="gap-2">
            <Field>
              <FieldLabel>
                New Password <span className="text-red-500">*</span>
              </FieldLabel>
              <div className="relative">
                <Input
                  {...register("new_password")}
                  placeholder="Enter new password"
                  type={isNewPassword ? "text" : "password"}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => setIsNewPassoword((prev) => !prev)}
                  className="absolute top-1/2 right-0 -translate-y-1/2 hover:bg-transparent"
                >
                  {isNewPassword ? <EyeIcon /> : <EyeOffIcon />}
                  <span className="sr-only">
                    {isNewPassword ? "Hide new password" : "Show new password"}
                  </span>
                </Button>
              </div>

              {errors.new_password && (
                <FieldError errors={[errors.new_password]} />
              )}
            </Field>
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

export default ChangePassword;
