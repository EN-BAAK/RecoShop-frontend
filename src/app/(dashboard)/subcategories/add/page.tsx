"use client";

import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useCreateSubCategory } from "@/hooks/useSubCategory";
import { useGetAllCategories } from "@/hooks/useCategory";
import { Category, SubCategoryCreation } from "@/types/global";
import { subcategory as subCategoryInitialValues } from "@/constants/formValues";
import { createSubCategory as createSubCategoryValidation } from "@/constants/formValidation";
import PageHolder from "@/app/PageHolder";
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
      title="إضافة تصنيف فرعي جديد"
      desc="قم بإضافة تصنيف فرعي جديد لتنظيم منتجاتك بشكل أدق"
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
                label="اسم التصنيف الفرعي"
                placeholder="مثال: أحذية، سماعات، نظارات..."
                required
              />

              <TextAreaField
                name="desc"
                label="الوصف"
                placeholder="أضف وصفاً تفصيلياً للتصنيف الفرعي..."
              />

              <SelectorField
                name="categoryId"
                label="التصنيف الرئيسي"
                options={categories.map((cat: Category) => ({
                  value: cat.id,
                  label: cat.title,
                }))}
                required
              />

              <div className="border-t border-muted" />

              <SubmitButton
                isSubmitting={isSubmitting}
                isDirty={dirty}
                isValid={isValid}
                label="إضافة التصنيف الفرعي"
              />
            </Form>
          )}
        </Formik>
      </div>
    </PageHolder>
  );
};

export default CreateSubCategoryPage;
