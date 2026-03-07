"use client";

import React, { useCallback } from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignupFormValues, signupSchema } from "@/schema/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useAuthMutation } from "@/hooks/mutations/auth.mutations";
import Link from "next/link";
import { useGeoQuery } from "@/hooks/queries/geo.queries";
import { countryCheck } from "@/lib/utils";

const SignupForm = () => {
  // ====================== Hooks ====================== \\
  const [isVisible, setIsVisible] = React.useState(false);

  const { data: geoData } = useGeoQuery.GetCountry();
  const country = geoData?.countryCode;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      password: "",
      email: "",
      contact_no: "",
      full_name: "",
      country,
    },
  });

  const handleTogglePassword = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  // ====================== Mutations ====================== \\
  const signupMutation = useAuthMutation.SignupMutation();

  // ====================== Form Submission ====================== \\
  const onSubmit = (data: SignupFormValues) => {
    signupMutation.mutate({ ...data, country });
  };

  return (
    <>
      <form
        id="signup-form"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldGroup className="gap-2">
          <Field>
            <Input
              {...register("full_name")}
              placeholder="Full Name"
              autoComplete="off"
              type="text"
              disabled={countryCheck(country)}
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
              disabled={countryCheck(country)}
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
              disabled={countryCheck(country)}
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
              disabled={countryCheck(country)}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleTogglePassword}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-max!"
              disabled={countryCheck(country)}
            >
              {isVisible ? <EyeOff /> : <Eye />}
            </Button>
          </Field>

          {errors.password?.message && (
            <FieldError errors={[errors.password]} />
          )}
        </FieldGroup>

        <FieldGroup className="gap-2">
          <Field>
            <Button
              type="submit"
              form="signup-form"
              size="lg"
              className="w-full"
              disabled={signupMutation.isPending || countryCheck(country)}
            >
              {signupMutation.isPending ? "Signing up..." : "Sign up"}
            </Button>
          </Field>
          <Field>
            <FieldDescription>
              Note: Signup is currently only available for US and UK customers.
            </FieldDescription>
            <FieldDescription className="text-center">
              Already have an account? <Link href="/signin">Sign in</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
};

export default SignupForm;
