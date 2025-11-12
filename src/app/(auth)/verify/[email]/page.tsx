"use client";

import { Formik, Form, FormikHelpers } from "formik";
import SubmitButton from "@/components/forms/SubmitButton";
import { useResendVerificationCode, useVerifyAccount } from "@/hooks/useAuth";
import { VerifyAccountProps } from "@/types/global";
import { verifyAccount as verifyAccountValidation } from "@/constants/formValidation";
import { verifyAccount } from "@/constants/formValues";
import OtpInput from "@/components/forms/OtpField";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const { mutateAsync: mutateVerifyAccount, isPending: isVerifyingPending } = useVerifyAccount();
  const { mutateAsync: mutateResendVerificationCode, isPending: isResendPending } = useResendVerificationCode()
  const searchParams = useSearchParams()

  const encodedEmail = searchParams.get("email")
  const email = encodedEmail ? decodeURIComponent(encodedEmail) : ""

  const onResendVerificationCodeRequest = async () => {
    mutateResendVerificationCode(String(email))
  }

  const onSubmit = async (
    values: VerifyAccountProps,
    formik: FormikHelpers<VerifyAccountProps>
  ) => {
    const payload = { ...values };

    await mutateVerifyAccount({ code: payload.code, email: String(email) });
    formik.setSubmitting(false);
  };

  return (
    <div className="bg-background sm:min-w-[400px] py-4 px-4 sm:px-6 border border-muted/50 rounded-2xl shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 font-heading font-bold text-3xl text-accent">
          Verify Account
        </h2>
        <p className="font-sans text-sm text-muted-foreground">
          Verify your account to gain access to Recoshop services.
        </p>
      </div>

      <Formik
        initialValues={verifyAccount}
        validationSchema={verifyAccountValidation}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="space-y-6">
            <OtpInput
              length={6}
              name="code"
            />

            <SubmitButton
              isSubmitting={isSubmitting}
              isDirty={dirty}
              isValid={isValid}
              label="Verify"
            />
          </Form>
        )}
      </Formik>

      <div className="my-8 relative">
        <div className="flex items-center absolute inset-0">
          <div className="w-full border-t border-muted"></div>
        </div>
        <div className="flex justify-center text-sm relative">
          <span className="bg-background px-4 text-muted-foreground font-sans">or</span>
        </div>
      </div>

      <div className="text-center">
        <p className="flex items-center justify-center space-x-2 font-sans text-sm text-muted-foreground">
          <span>Didn’t receive the verification code?</span>

          <Button
            className="p-0 font-semibold text-primary cursor-pointer hover:text-primary/80 hover:no-underline"
            variant="link"
            disabled={isVerifyingPending || isResendPending}
            onClick={onResendVerificationCodeRequest}
          >
            Resend Code
          </Button>
        </p>
      </div>
    </div>
  );
}
