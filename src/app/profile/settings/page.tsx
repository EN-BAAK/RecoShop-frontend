"use client";

import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InputField from "@/components/forms/InputField";
import SubmitButton from "@/components/forms/SubmitButton";
import { useChangePassword } from "@/hooks/useAuth";
import { changePasswordInitialValues } from "@/constants/formValues";
import { changePasswordValidation, } from "@/constants/formValidation";
import { ChangePasswordProps } from "@/types/forms";

export default function ChangePasswordPage() {
  const { mutateAsync } = useChangePassword();

  const onSubmit = async (values: ChangePasswordProps, formik: FormikHelpers<ChangePasswordProps>) => {
    await mutateAsync({ oldPassword: values.oldPassword, newPassword: values.newPassword, });
    formik.setSubmitting(false)
  };

  return (
    <div className="bg-background h-[90vh] w-full px-4 flex items-center justify-center">
      <div className="w-full max-[w-300px] max-w-md mx-auto">
        <Card className="border-muted shadow-lg">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">
              Change Password
            </CardTitle>
            <CardDescription>
              Update your account password
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Formik
              initialValues={changePasswordInitialValues}
              validationSchema={changePasswordValidation}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, dirty, isValid }) => (
                <Form className="space-y-6">
                  <InputField
                    name="oldPassword"
                    type="password"
                    label="Current Password"
                    Icon={<Lock />}
                    placeholder="******"
                    required
                  />

                  <InputField
                    name="newPassword"
                    type="password"
                    label="New Password"
                    Icon={<Lock />}
                    placeholder="******"
                    required
                  />

                  <InputField
                    name="confirmNewPassword"
                    type="password"
                    label="Confirm New Password"
                    Icon={<Lock />}
                    placeholder="******"
                    required
                  />

                  <SubmitButton
                    isSubmitting={isSubmitting}
                    isDirty={dirty}
                    isValid={isValid}
                    label="Update Password"
                  />
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
