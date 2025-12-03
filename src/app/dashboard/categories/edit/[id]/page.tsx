"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import { useGetCategoryById, useUpdateCategory } from "@/hooks/useCategory";
import { CategoryCreation } from "@/types/global";
import { editCategory as editCategoryValidation } from "@/constants/formValidation";
import InputField from "@/components/forms/InputField";
import TextAreaField from "@/components/forms/TextAreaField";
import SubmitButton from "@/components/forms/SubmitButton";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import PageHolder from "@/app/PageHolder";

const EditCategoryPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { data: categoryData, isFetching, isError, error, refetch } =
    useGetCategoryById(Number(params.id));
  const { mutateAsync: updateCategory } = useUpdateCategory();

  const category = categoryData?.data;

  const goBack = () => router.back();

  const onSubmit = async (
    values: CategoryCreation,
    formik: FormikHelpers<CategoryCreation>,
    initialValues: CategoryCreation
  ) => {
    const changedValues: Partial<CategoryCreation> = {};

    if (values.title !== initialValues.title) changedValues.title = values.title;
    if (values.desc !== initialValues.desc) changedValues.desc = values.desc;

    await updateCategory({ id: Number(params.id), data: changedValues });
    formik.setSubmitting(false);
  };

  return (
    <PageHolder
      title="Edit Category"
      desc="Modify the details of the selected category."
    >
      {isFetching ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage action={refetch} msg={error.message} />
      ) : !category ? (
        <EmptyElement
          title="Category Not Found"
          button={{ action: goBack, msg: "Back to Categories" }}
        />
      ) : (
        <div className="p-8 border border-muted rounded-xl">
          <Formik
            enableReinitialize
            initialValues={category}
            validationSchema={editCategoryValidation}
            onSubmit={(values, helpers) => onSubmit(values, helpers, category)}
          >
            {({ dirty, isValid, isSubmitting }) => (
              <Form className="space-y-6">
                <InputField
                  type="text"
                  name="title"
                  label="Category Name"
                  placeholder="Category name..."
                  required
                />

                <TextAreaField
                  name="desc"
                  label="Description"
                  placeholder="Detailed description of the category..."
                />

                <div className="border-t border-muted" />

                <SubmitButton
                  isSubmitting={isSubmitting}
                  isDirty={dirty}
                  isValid={isValid}
                  label="Update Category"
                />
              </Form>
            )}
          </Formik>
        </div>
      )}
    </PageHolder>
  );
};

export default EditCategoryPage;
