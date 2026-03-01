"use client";

import React from "react";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { VerifyOTPFormValues, verifyOTPschema } from "@/schema/auth.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthMutation } from "@/hooks/mutations/auth.mutations";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const VerifyOtpForm = () => {
  // ====================== Hooks ====================== \\
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VerifyOTPFormValues>({
    resolver: zodResolver(verifyOTPschema),
    defaultValues: {
      otp: "",
    },
  });

  // ====================== Mutations ====================== \\
  const verifyOtpMutation = useAuthMutation.VerifyOTPMutation();

  // ====================== Form Submission ====================== \\
  const onSubmit = (data: VerifyOTPFormValues) => {
    verifyOtpMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <>
      <form
        id="signup-form"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldGroup className="gap-2">
          <Controller
            name="otp"
            control={control}
            render={({ field }) => {
              return (
                <Field>
                  <InputOTP
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onComplete={() => handleSubmit(onSubmit)()}
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    disabled={
                      verifyOtpMutation.isPending || verifyOtpMutation.isSuccess
                    }
                    id="otp"
                  >
                    <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border mx-auto">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </Field>
              );
            }}
          />

          {errors.otp?.message && (
            <FieldError errors={[errors.otp]} className="text-center" />
          )}
        </FieldGroup>
      </form>
    </>
  );
};

export default VerifyOtpForm;
