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
  const { mutateAsync } = useLogin()


  const onSubmit = async (values: LoginProps, formik: FormikHelpers<LoginProps>) => {
    await mutateAsync(values)
    formik.setSubmitting(false)
  }

  return (
    <div className="bg-background sm:min-w-[400px] py-4 px-4 sm:px-6 border border-muted/50 rounded-2xl shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 font-ruqaa font-bold text-3xl text-accent">
          تسجيل الدخول
        </h2>
        <p className="font-sans text-sm text-muted-foreground">
          مرحباً بعودتك! الرجاء إدخال بياناتك
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
              label="البريد الإلكتروني"
              Icon={<Mail />}
              placeholder="example@email.com"
              required
            />

            <InputField
              name="password"
              type="password"
              autoComplete='off'
              label="كلمة المرور"
              Icon={<Lock />}
              placeholder="******"
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
          <span className="bg-background px-4 text-muted-foreground font-sans">
            أو
          </span>
        </div>
      </div>

      <div className="text-center">
        <p className="space-x-2 font-sans text-sm text-muted-foreground">
          <span>ليس لديك حساب؟</span>

          <Link
            href="/signup"
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  );
}
