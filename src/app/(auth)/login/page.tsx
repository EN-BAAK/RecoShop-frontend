'use client';

import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { Form, Formik, FormikHelpers } from 'formik';
import InputField from '@/components/forms/InputField';
import SubmitButton from '@/components/forms/SubmitButton';
import { login } from '@/constants/formValues';
import { LoginProps } from '@/types/global';
import { useLogin } from '@/hooks/useAuth';
import { login as loginValidation } from '@/constants/formValidation';

export default function LoginPage() {
  const { mutateAsync } = useLogin();

  const onSubmit = async (values: LoginProps, formik: FormikHelpers<LoginProps>) => {
    await mutateAsync(values);
    formik.setSubmitting(false);
  };

  return (
    <div className="bg-background sm:min-w-[400px] py-4 px-4 sm:px-6 border border-muted/50 rounded-2xl shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 font-heading font-bold text-3xl text-accent">
          Login
        </h2>
        <p className="font-sans text-sm text-muted-foreground">
          Welcome back! Please enter your credentials
        </p>
      </div>

      <Formik
        initialValues={login}
        validationSchema={loginValidation}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="space-y-6">
            <InputField
              name="email"
              type="email"
              label="Email Address"
              Icon={<Mail />}
              placeholder="example@email.com"
              required
            />

            <div className="space-y-2">
              <InputField
                name="password"
                type="password"
                autoComplete="off"
                label="Password"
                Icon={<Lock />}
                placeholder="******"
                required
              />

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

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
          <span className="bg-background px-4 text-muted-foreground font-sans">
            OR
          </span>
        </div>
      </div>

      <div className="text-center">
        <p className="font-sans text-sm text-muted-foreground">
          <span>Don’t have an account?</span>{' '}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
}
