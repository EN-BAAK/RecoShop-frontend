"use client";

import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useCreateProduct } from "@/hooks/useProduct";
import { ProductCreation, SubCategory } from "@/types/global";
import SubmitButton from "@/components/forms/SubmitButton";
import InputField from "@/components/forms/InputField";
import TextAreaField from "@/components/forms/TextAreaField";
import SelectImageField from "@/components/forms/SelectImageField";
import PageHolder from "@/app/PageHolder";
import { product as initialValues } from "@/constants/formValues";
import { createProduct as createProductValidation } from "@/constants/formValidation";
import SelectorField from "@/components/forms/SelectorField";
import { useGetAllCategories } from "@/hooks/useCategory";

const CreateProductPage: React.FC = () => {
  const { mutateAsync: createProduct } = useCreateProduct();
  const { data, isLoading } = useGetAllCategories();
  const [image, setImage] = useState<File | undefined>(undefined);

  const categories = data?.data || []

  const onSubmit = async (
    values: ProductCreation,
    formik: FormikHelpers<ProductCreation>
  ) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("brand", values.brand);
    formData.append("price", values.price.toString());
    formData.append("desc", values.desc);
    formData.append("categoryId", values.categoryId.toString());
    // values.categories.forEach((cat: number) =>
    //   formData.append("categories[]", String(cat))
    // );
    if (image) formData.append("image", image);

    await createProduct(formData);
    formik.setSubmitting(false);
  };

  const categoryOptions = categories.map((cat: SubCategory) => ({
    key: cat.title,
    value: String(cat.id),
  }));

  return (
    <PageHolder
      title="Add New Product"
      desc="Add a new product to expand your online store."
    >
      <div className="bg-background p-8 border border-muted rounded-xl overflow-y-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={createProductValidation}
          onSubmit={onSubmit}
        >
          {({ dirty, isValid, isSubmitting }) => (
            <Form className="space-y-6">
              <InputField
                name="title"
                type="text"
                label="Product Name"
                placeholder="Example: Bluetooth Headphones, Men's Shirt..."
                required
              />

              <InputField
                name="brand"
                type="text"
                label="Brand"
                placeholder="Manufacturer name..."
                required
              />

              <InputField
                name="price"
                type="number"
                label="Price"
                placeholder="Enter the price in SYP..."
                required
              />

              <TextAreaField
                name="desc"
                label="Description"
                placeholder="Add a detailed description of the product..."
              />

              {!isLoading && (
                <SelectorField
                  name="categoryId"
                  label="category"
                  options={categoryOptions}
                  required
                  styles="font-sans"
                />
              )}

              <SelectImageField
                label="Product Image"
                value={image}
                setValue={setImage}
                className="mt-4"
              />

              <div className="border-t border-muted" />

              <SubmitButton
                isSubmitting={isSubmitting}
                isDirty={dirty}
                isValid={isValid}
                label="Add Product"
              />
            </Form>
          )}
        </Formik>
      </div>
    </PageHolder>
  );
};

export default CreateProductPage;
