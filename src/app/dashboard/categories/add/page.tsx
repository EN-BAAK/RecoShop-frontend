"use client";

import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useCreateCategory } from "@/hooks/useCategory";
import { CategoryCreation } from "@/types/global";
import { category as categoryInitialValues } from "@/constants/formValues";
import { createCategory as createCategoryValidation } from "@/constants/formValidation";
import SubmitButton from "@/components/forms/SubmitButton";
import InputField from "@/components/forms/InputField";
import TextAreaField from "@/components/forms/TextAreaField";
import PageHolder from "@/app/dashboard/DashboardPageHolder";

const CreateCategoryPage: React.FC = () => {
  const { mutateAsync: createCategory } = useCreateCategory();

  const onSubmit = async (
    values: CategoryCreation,
    formik: FormikHelpers<CategoryCreation>
  ) => {
    await createCategory(values);
    formik.setSubmitting(false);
  };

  return (
    <PageHolder
      title="Add New Category"
      desc="Create a new category to organize your products."
    >
      <div className="p-8 border border-muted rounded-xl">
        <Formik
          initialValues={categoryInitialValues}
          validationSchema={createCategoryValidation}
          onSubmit={onSubmit}
        >
          {({ dirty, isValid, isSubmitting }) => (
            <Form className="space-y-6">
              <InputField
                type="text"
                name="title"
                label="Category Name"
                placeholder="Example: Electronics, Clothing, Books..."
                required
              />

              <TextAreaField
                name="desc"
                label="Description"
                placeholder="Add a detailed description of the category..."
              />

              <div className="border-t border-muted" />

              <SubmitButton
                isSubmitting={isSubmitting}
                isDirty={dirty}
                isValid={isValid}
                label="Add Category"
              />
            </Form>
          )}
        </Formik>
      </div>
    </PageHolder>
  );
};

export default CreateCategoryPage;
