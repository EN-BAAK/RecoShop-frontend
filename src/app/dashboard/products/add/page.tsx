"use client";

import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useCreateProduct } from "@/hooks/useProduct";
import { Brand, Category, ProductCreation, SubCategory } from "@/types/global";
import SubmitButton from "@/components/forms/SubmitButton";
import InputField from "@/components/forms/InputField";
import TextAreaField from "@/components/forms/TextAreaField";
import SelectImageField from "@/components/forms/SelectImageField";
import PageHolder from "@/app/PageHolder";
import { product as initialValues } from "@/constants/formValues";
import { createProduct as createProductValidation } from "@/constants/formValidation";
import { useGetAllCategories } from "@/hooks/useCategory";
import { useGetSubCategoriesByCategory } from "@/hooks/useSubCategory";
import MultiSelectorField from "@/components/forms/MultiSelectorField";
import { useGetAllBrands } from "@/hooks/useBrand";
import SelectorField from "@/components/forms/SelectorField";

const CreateProductPage: React.FC = () => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { mutateAsync: createProduct } = useCreateProduct();
  const { data: categoriesData, isFetching: isCategoriesLoading } = useGetAllCategories();
  const { data: brandsData, isFetching: isBrandsLoading } = useGetAllBrands();
  const { data: SubCategoriesData, isFetching: isSubCategoriesLoading } = useGetSubCategoriesByCategory(selectedCategory);

  const categories = categoriesData?.data || []

  const onSubmit = async (
    values: ProductCreation,
    formik: FormikHelpers<ProductCreation>
  ) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("brandId", values.brandId.toString());
    formData.append("price", values.price.toString());
    formData.append("desc", values.desc);
    values.categories.forEach((cat: number) =>
      formData.append("categories[]", String(cat))
    );
    if (image) formData.append("image", image);

    await createProduct(formData);
    formik.setSubmitting(false);
  };

  const categoryOptions = categories.map((cat: Omit<Category, "desc">) => ({
    key: cat.title,
    value: cat.title,
  }));

  const subCategoryOptions = SubCategoriesData?.data?.map((sub: Omit<SubCategory, "desc" | "categoryId">) => ({
    key: sub.title,
    value: String(sub.id),
  })) || [];

  const brandOptions = brandsData?.data?.map((sub: Omit<Brand, "imgURL">) => ({
    key: sub.name,
    value: String(sub.id),
  })) || [];


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
          {({ dirty, isValid, isSubmitting, setFieldValue }) => (
            <Form className="space-y-6">
              <InputField
                name="title"
                type="text"
                label="Product Name"
                placeholder="Example: Bluetooth Headphones, Men's Shirt..."
                required
              />

              {!isBrandsLoading &&
                <SelectorField
                  options={brandOptions}
                  name="brandId"
                  required
                  label="brand"
                  styles="font-sans"
                />
              }

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

              {!isCategoriesLoading && (
                <React.Fragment>
                  <label className="mb-1">Group:</label>

                  <select
                    className="w-full border p-3 rounded-md bg-background"
                    value={selectedCategory}
                    onChange={(e) => {
                      const title = e.target.value;
                      setSelectedCategory(title);
                      setFieldValue("categories", []);
                    }}
                  >
                    <option value="" disabled>Select Category</option>

                    {categoryOptions.map((cat: { value: string, key: string }) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.key}
                      </option>
                    ))}
                  </select>
                </React.Fragment>
              )}

              {(!isSubCategoriesLoading && !isCategoriesLoading) && (
                <MultiSelectorField
                  name="categories"
                  label="category"
                  options={subCategoryOptions}
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
