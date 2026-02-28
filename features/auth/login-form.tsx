"use client";

import React, { useCallback } from "react";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginFormValues, loginSchema } from "@/schema/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useAuthMutation } from "@/hooks/mutations/auth.mutation";

const LoginForm = () => {
  // ====================== Hooks ====================== \\
  const [isVisible, setIsVisible] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const handleTogglePassword = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  // ====================== Mutations ====================== \\
  const loginMutation = useAuthMutation.loginMutation();

  // ====================== Form Submission ====================== \\
  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      <form
        id="login-form"
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
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

        <Field>
          <Button
            type="submit"
            form="login-form"
            size="lg"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </Field>
      </form>
    </>
  );
};

export default LoginForm;
