"use client";

import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useCreateSubCategory } from "@/hooks/useSubCategory";
import { useGetAllCategories } from "@/hooks/useCategory";
import { Category, SubCategoryCreation } from "@/types/global";
import { subcategory as subCategoryInitialValues } from "@/constants/formValues";
import { createSubCategory as createSubCategoryValidation } from "@/constants/formValidation";
import PageHolder from "@/app/dashboard/DashboardPageHolder";
import InputField from "@/components/forms/InputField";
import TextAreaField from "@/components/forms/TextAreaField";
import SubmitButton from "@/components/forms/SubmitButton";
import SelectorField from "@/components/forms/SelectorField";

const CreateSubCategoryPage: React.FC = () => {
  const { mutateAsync: createSubCategory } = useCreateSubCategory();
  const { data: categoriesData } = useGetAllCategories();

  const categories = categoriesData?.data || [];

  const onSubmit = async (
    values: SubCategoryCreation,
    formik: FormikHelpers<SubCategoryCreation>
  ) => {
    await createSubCategory(values);
    formik.setSubmitting(false);
  };

  return (
    <PageHolder
      title="Add New Subcategory"
      desc="Add a new subcategory to organize your products more precisely."
    >
      <div className="p-8 border border-muted rounded-xl overflow-y-auto">
        <Formik
          initialValues={subCategoryInitialValues}
          validationSchema={createSubCategoryValidation}
          onSubmit={onSubmit}
        >
          {({ dirty, isValid, isSubmitting }) => (
            <Form className="space-y-6">
              <InputField
                type="text"
                name="title"
                label="Subcategory Name"
                placeholder="Example: Shoes, Headphones, Glasses..."
                required
              />

              <TextAreaField
                name="desc"
                label="Description"
                placeholder="Add a detailed description for the subcategory..."
              />

              <SelectorField
                name="categoryId"
                label="Parent Category"
                options={categories.map((cat: Category) => ({
                  value: cat.id,
                  key: cat.title,
                }))}
                required
              />

              <div className="border-t border-muted" />

              <SubmitButton
                isSubmitting={isSubmitting}
                isDirty={dirty}
                isValid={isValid}
                label="Add Subcategory"
              />
            </Form>
          )}
        </Formik>
      </div>
    </PageHolder>
  );
};

export default CreateSubCategoryPage;
