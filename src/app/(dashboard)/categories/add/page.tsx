"use client";

import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useCreateCategory } from "@/hooks/useCategory";
import { CategoryCreation } from "@/types/global";
import { category as categoryInitialValues } from "@/constants/formValues";
import { createCategory as createCategoryCreation } from "@/constants/formValidation"
import SubmitButton from "@/components/forms/SubmitButton";
import InputField from "@/components/forms/InputField";
import TextAreaField from "@/components/forms/TextAreaField";
import PageHolder from "@/app/PageHolder";

const CreateCategoryPage: React.FC = () => {
  const { mutateAsync: createCategory } = useCreateCategory();

  const onSubmit = async (values: CategoryCreation, formik: FormikHelpers<CategoryCreation>) => {
    await createCategory(values)
    formik.setSubmitting(false)
  };

  return (
    <PageHolder
      title="إضافة تصنيف جديد"
      desc="قم بإضافة تصنيف جديد لتنظيم منتجاتك"
    >
      <div className="p-8 border border-muted rounded-xl">
        <Formik
          initialValues={categoryInitialValues}
          validationSchema={createCategoryCreation}
          onSubmit={onSubmit}
        >
          {({ dirty, isValid, isSubmitting }) => (
            <Form className="space-y-6">
              <InputField
                type="text"
                name="title"
                placeholder="مثال: إلكترونيات، ملابس، كتب..."
                required
                label="اسم التصنيف"
              />

              <TextAreaField
                name="desc"
                placeholder="أضف وصفاً تفصيلياً للتصنيف..."
                label="الوصف"
              />

              <div className="border-t border-muted" />

              <SubmitButton
                isSubmitting={isSubmitting}
                isDirty={dirty}
                isValid={isValid}
                label="إضافة التصنيف"
              />
            </Form>
          )}
        </Formik>
      </div>
    </PageHolder >
  );
};

export default CreateCategoryPage;