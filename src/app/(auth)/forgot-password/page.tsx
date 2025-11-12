"use client";

import { Formik, Form, FormikHelpers } from "formik";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import InputField from "@/components/forms/InputField";
import SubmitButton from "@/components/forms/SubmitButton";
import { ForgotPasswordStep1, ForgotPasswordStep2 } from "@/types/global";
import { forgotPasswordStep1 as forgotPasswordStep1InitialValues, forgotPasswordStep2 as forgotPasswordStep2InitialValues, } from "@/constants/formValues";
import { forgotPasswordStep1 as forgotPasswordStep1Validation, forgotPasswordStep2 as forgotPasswordStep2Validation, } from "@/constants/formValidation";
import { useResetPasswordRequest, useResetForgottenPassword, } from "@/hooks/useAuth";
import OtpInput from "@/components/forms/OtpField";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isResend, setIsResend] = useState<boolean>(false)

  const { mutateAsync: sendResetCode, isSuccess: isCodeSent, isPending: isSendingCode, } = useResetPasswordRequest();

  const { mutateAsync: resetPassword, isPending: isResetting, } = useResetForgottenPassword();

  const handleEmailSubmit = async (
    values: ForgotPasswordStep1,
    formik: FormikHelpers<ForgotPasswordStep1>
  ) => {
    try {
      await sendResetCode(values);
      setEmail(values.email);
    } catch (error) {
      console.error(error);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const handleResetSubmit = async (
    values: ForgotPasswordStep2,
    formik: FormikHelpers<ForgotPasswordStep2>
  ) => {
    try {
      await resetPassword({ ...values, email });
    } catch (error) {
      console.error(error);
    } finally {
      formik.setSubmitting(false);
    }
  };

  const resendForgottenPasswordVerificationCode = async () => {
    setIsResend(true)
    await sendResetCode({ email })
    setIsResend(false)
  }

  return (
    <div className="bg-background sm:min-w-[400px] py-4 px-4 sm:px-6 border border-muted/50 rounded-2xl shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 font-heading font-bold text-3xl text-accent">
          Forgot Password
        </h2>
        <p className="font-sans text-sm text-muted-foreground">
          {(isCodeSent || isResend)
            ? "Enter the verification code and your new password"
            : "Enter your email to receive a verification code"}
        </p>
      </div>

      {(!isCodeSent && !isResend) ? (
        <Formik
          initialValues={forgotPasswordStep1InitialValues}
          validationSchema={forgotPasswordStep1Validation}
          onSubmit={handleEmailSubmit}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form className="space-y-6">
              <InputField
                name="email"
                type="email"
                label="Email"
                Icon={<Mail />}
                placeholder="example@email.com"
                required
              />

              <SubmitButton
                isSubmitting={isSubmitting || isSendingCode}
                isDirty={dirty}
                isValid={isValid}
                label="Send Code"
                submittingLabel="Sending..."
                disabledLabel="Enter your email"
              />
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={forgotPasswordStep2InitialValues}
          validationSchema={forgotPasswordStep2Validation}
          onSubmit={handleResetSubmit}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form className="space-y-6">
              <OtpInput
                name="code"
                length={6}
              />

              <InputField
                name="password"
                type="password"
                label="New Password"
                Icon={<Lock />}
                placeholder="••••••••"
                required
              />

              <InputField
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                Icon={<Lock />}
                placeholder="••••••••"
                required
              />

              <SubmitButton
                isSubmitting={isSubmitting || isResetting}
                isDirty={dirty}
                isValid={isValid}
                label="Reset Password"
                submittingLabel="Resetting..."
                disabledLabel="Complete all fields"
              />

              <div className="text-center">
                <p className="flex items-center justify-center space-x-2 font-sans text-sm text-muted-foreground">
                  <span>Didn’t receive the verification code?</span>

                  <Button
                    className="p-0 font-semibold text-primary cursor-pointer hover:text-primary/80 hover:no-underline"
                    variant="link"
                    disabled={isSendingCode || isResetting}
                    onClick={resendForgottenPasswordVerificationCode}
                  >
                    Resend Code
                  </Button>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
