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
import SelectorField from "@/components/forms/SelectorField";
import PageHolder from "@/app/PageHolder";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";

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

    if (values.title !== initialValues.title) changedValues.title = values.title;
    if (values.desc !== initialValues.desc) changedValues.desc = values.desc;
    if (values.categoryId !== initialValues.categoryId)
      changedValues.categoryId = values.categoryId;

    await updateSubCategory({ id: Number(params.id), data: changedValues });
    formik.setSubmitting(false);
  };

  return (
    <PageHolder
      title="Edit Subcategory"
      desc="Modify the details of the selected subcategory."
    >
      {isFetching ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage action={refetch} msg={error.message} />
      ) : !subCategory ? (
        <EmptyElement
          title="Subcategory Not Found"
          button={{
            action: goBack,
            msg: "Back to Subcategories",
          }}
        />
      ) : (
        <div className="p-8 border border-muted rounded-xl">
          <Formik
            enableReinitialize
            initialValues={subCategory}
            validationSchema={editSubCategoryValidation}
            onSubmit={(values, helpers) => onSubmit(values, helpers, subCategory)}
          >
            {({ dirty, isValid, isSubmitting }) => (
              <Form className="space-y-6">
                <InputField
                  type="text"
                  name="title"
                  label="Subcategory Name"
                  placeholder="Subcategory Name..."
                />

                <TextAreaField
                  name="desc"
                  label="Description"
                  placeholder="Detailed description of the subcategory..."
                />

                <SelectorField
                  name="categoryId"
                  label="Parent Category"
                  options={categories.map((cat: Category) => ({
                    value: cat.id,
                    key: cat.title,
                  }))}
                />

                <div className="border-t border-muted" />

                <SubmitButton
                  isSubmitting={isSubmitting}
                  isDirty={dirty}
                  isValid={isValid}
                  label="Update Subcategory"
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
