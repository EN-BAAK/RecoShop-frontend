"use client";

import Link from "next/link";
import { Formik, Form, FormikHelpers } from "formik";
import { Mail, Lock, User, Phone, MapPin } from "lucide-react";
import InputField from "@/components/forms/InputField";
import SelectorField from "@/components/forms/SelectorField";
import SubmitButton from "@/components/forms/SubmitButton";
import { useSignup } from "@/hooks/useAuth";
import { GOVERNORATE, SEX } from "@/types/variables";
import { SignupProps } from "@/types/global";
import { signup as signupValidation } from "@/constants/formValidation";
import { signup } from "@/constants/formValues";

export default function SignupPage() {
  const { mutateAsync } = useSignup();

  const governorateOptions = Object.values(GOVERNORATE).map((gov) => ({
    key: gov,
    value: gov,
  }));

  const genderOptions = [
    { key: "Male", value: SEX.MALE },
    { key: "Female", value: SEX.FEMALE },
  ];

  const onSubmit = async (
    values: SignupProps,
    formik: FormikHelpers<SignupProps>
  ) => {
    const payload = {
      ...values,
      role: "Client",
      confirmPassword: undefined
    };
    await mutateAsync(payload);
    formik.setSubmitting(false);
  };

  return (
    <div className="bg-background sm:min-w-[400px] py-4 px-4 sm:px-6 border border-muted/50 rounded-2xl shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 font-heading font-bold text-3xl text-accent">
          Create a New Account
        </h2>
        <p className="font-sans text-sm text-muted-foreground">
          Join us and start a unique shopping experience
        </p>
      </div>

      <Formik
        initialValues={signup}
        validationSchema={signupValidation}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="space-y-6">
            <div className="flex gap-4">
              <InputField
                name="firstName"
                label="First Name"
                placeholder="John"
                Icon={<User />}
                required
                type="text"
              />
              <InputField
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                Icon={<User />}
                required
                type="text"
              />
            </div>

            <InputField
              name="email"
              type="email"
              label="Email"
              Icon={<Mail />}
              placeholder="example@email.com"
              required
            />

            <InputField
              name="phone"
              label="Phone Number"
              Icon={<Phone />}
              placeholder="09XXXXXXXX"
              required
              type="text"
            />

            <div className="flex gap-4">
              <InputField
                name="password"
                type="password"
                label="Password"
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
            </div>

            <SelectorField
              name="governorate"
              label="Governorate"
              options={governorateOptions}
              Icon={<MapPin />}
              required
            />

            <SelectorField
              name="gender"
              label="Gender"
              options={genderOptions}

              required
            />

            <SubmitButton
              isSubmitting={isSubmitting}
              isDirty={dirty}
              isValid={isValid}
            />
          </Form>
        )}
      </Formik>

      <div className="my-8 relative">
        <div className="flex items-center absolute inset-0">
          <div className="w-full border-t border-muted"></div>
        </div>
        <div className="flex justify-center text-sm relative">
          <span className="bg-background px-4 text-muted-foreground font-sans">Or</span>
        </div>
      </div>

      <div className="text-center">
        <p className="space-x-2 font-sans text-sm text-muted-foreground">
          <span>Already have an account?</span>

          <Link
            href="/login"
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}