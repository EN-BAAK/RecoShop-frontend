"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import { useGetProductById, useUpdateProduct } from "@/hooks/useProduct";
import { ProductCreation, SubCategory } from "@/types/global";
import { editProduct as editProductValidation } from "@/constants/formValidation";
import PageHolder from "@/app/PageHolder";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import InputField from "@/components/forms/InputField";
import TextAreaField from "@/components/forms/TextAreaField";
import SelectImageField from "@/components/forms/SelectImageField";
import SubmitButton from "@/components/forms/SubmitButton";
import SelectorField from "@/components/forms/SelectorField";
import { useGetAllCategories } from "@/hooks/useCategory";

const EditProductPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const [image, setImage] = useState<File | undefined>(undefined);

  const { data: productData, isFetching, isError, error, refetch } =
    useGetProductById(Number(params.id));

  const { data, isLoading } = useGetAllCategories();
  const { mutateAsync: updateProduct } = useUpdateProduct();

  const categories = data?.data || []

  const product = productData?.data

  const goBack = () => router.back();

  const onSubmit = async (
    values: ProductCreation,
    formik: FormikHelpers<ProductCreation>,
    initialValues: ProductCreation
  ) => {
    const formData = new FormData();

    if (values.title !== initialValues.title)
      formData.append("title", values.title);

    if (values.brand !== initialValues.brand)
      formData.append("brand", values.brand);

    if (values.price !== initialValues.price)
      formData.append("price", values.price.toString());

    if (values.desc !== initialValues.desc)
      formData.append("desc", values.desc);

    if (values.categoryId !== initialValues.categoryId)
      formData.append("categoryId", values.categoryId.toString());

    // if (JSON.stringify(values.categories) !== JSON.stringify(initialValues.categories)) {
    //   values.categories.forEach((cat: number) =>
    //     formData.append("categories[]", String(cat))
    //   );
    // }

    if (image) formData.append("image", image);

    await updateProduct({ id: Number(params.id), data: formData });
    formik.setSubmitting(false);
  };

  const categoryOptions = categories.map((cat: SubCategory) => ({
    key: cat.title,
    value: String(cat.id),
  }));

  return (
    <PageHolder
      title="Edit Product"
      desc="You can update the current product details."
    >
      {isFetching ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage action={refetch} msg={error.message} />
      ) : !product ? (
        <EmptyElement
          title="Product Not Found"
          button={{
            action: goBack,
            msg: "Go Back",
          }}
        />
      ) : (
        <div className="bg-background p-8 border border-muted rounded-xl overflow-y-auto">
          <Formik
            enableReinitialize
            initialValues={product}
            validationSchema={editProductValidation}
            onSubmit={(values, helpers) => onSubmit(values, helpers, product)}
          >
            {({ dirty, isValid, isSubmitting }) => (
              <Form className="space-y-6">
                <InputField
                  name="title"
                  type="text"
                  label="Product Name"
                  placeholder="Product Name..."
                  required
                />

                <InputField
                  name="brand"
                  type="text"
                  label="Brand"
                  placeholder="Manufacturer Name..."
                  required
                />

                <InputField
                  name="price"
                  type="number"
                  label="Price"
                  placeholder="Price in SYP..."
                  required
                />

                <TextAreaField
                  name="desc"
                  label="Description"
                  placeholder="Detailed product description..."
                />

                {!isLoading && (
                  <SelectorField
                    name="categoryId"
                    label="category"
                    options={categoryOptions}
                    required
                  />
                )}

                <SelectImageField
                  label="Change Product Image (Optional)"
                  value={image}
                  setValue={setImage}
                />

                <div className="border-t border-muted" />

                <SubmitButton
                  isSubmitting={isSubmitting}
                  isDirty={dirty}
                  isValid={isValid}
                  label="Update Product"
                />
              </Form>
            )}
          </Formik>
        </div>
      )}
    </PageHolder>
  );
};

export default EditProductPage;
