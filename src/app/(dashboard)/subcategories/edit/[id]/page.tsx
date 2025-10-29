"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import { useGetSubCategoryById, useUpdateSubCategory } from "@/hooks/useSubCategory";
import { useGetAllCategories } from "@/hooks/useCategory";
import { Category, SubCategoryCreation } from "@/types/global";
import { editSubCategory as editSubCategoryValidation } from "@/constants/formValidation";
import InputField from "@/components/forms/InputField";
import TextAreaField from "@/components/forms/TextAreaField";
import SubmitButton from "@/components/forms/SubmitButton";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import PageHolder from "@/app/PageHolder";
import SelectorField from "@/components/forms/SelectorField";

const EditSubCategoryPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const { data: subCategoryData, isFetching, isError, error, refetch } =
    useGetSubCategoryById(Number(params.id));

  const { data: categoriesData } = useGetAllCategories();
  const { mutateAsync: updateSubCategory } = useUpdateSubCategory();

  const subCategory = subCategoryData?.data;
  const categories = categoriesData?.data || [];

  const goBack = () => router.back();

  const onSubmit = async (
    values: SubCategoryCreation,
    formik: FormikHelpers<SubCategoryCreation>,
    initialValues: SubCategoryCreation
  ) => {
    const changedValues: Partial<SubCategoryCreation> = {};

    if (values.title !== initialValues.title) {
      changedValues.title = values.title;
    }
    if (values.desc !== initialValues.desc) {
      changedValues.desc = values.desc;
    }
    if (values.categoryId !== initialValues.categoryId) {
      changedValues.categoryId = values.categoryId;
    }

    await updateSubCategory({ id: Number(params.id), data: changedValues });
    formik.setSubmitting(false);
  };

  return (
    <PageHolder
      title="تعديل التصنيف الفرعي"
      desc="يمكنك تعديل بيانات التصنيف الفرعي الحالية"
    >
      {isFetching ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage action={refetch} msg={error.message} />
      ) : !subCategory ? (
        <EmptyElement
          title="التصنيف الفرعي غير موجود"
          button={{
            action: goBack,
            msg: "العودة إلى التصنيفات الفرعية",
          }}
        />
      ) : (
        <div className="p-8 border border-muted rounded-xl">
          <Formik
            enableReinitialize
            initialValues={subCategory}
            validationSchema={editSubCategoryValidation}
            onSubmit={(values, helpers) =>
              onSubmit(values, helpers, subCategory)
            }
          >
            {({ dirty, isValid, isSubmitting }) => (
              <Form className="space-y-6">
                <InputField
                  type="text"
                  name="title"
                  label="اسم التصنيف الفرعي"
                  placeholder="اسم التصنيف الفرعي..."
                />

                <TextAreaField
                  name="desc"
                  label="الوصف"
                  placeholder="الوصف التفصيلي للتصنيف الفرعي..."
                />

                <SelectorField
                  name="categoryId"
                  label="التصنيف الرئيسي"
                  options={categories.map((cat: Category) => ({
                    value: cat.id,
                    label: cat.title,
                  }))}
                />

                <div className="border-t border-muted" />

                <SubmitButton
                  isSubmitting={isSubmitting}
                  isDirty={dirty}
                  isValid={isValid}
                  label="تحديث التصنيف الفرعي"
                />
              </Form>
            )}
          </Formik>
        </div>
      )}
    </PageHolder>
  );
};

export default EditSubCategoryPage;
