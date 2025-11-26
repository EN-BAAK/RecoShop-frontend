"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import { useGetProductSettingsById, useGetProductImage, useUpdateProduct, } from "@/hooks/useProduct";
import { useGetAllCategories } from "@/hooks/useCategory";
import { useGetSubCategoriesByCategory } from "@/hooks/useSubCategory";
import { Category, ProductCreation, SubCategory } from "@/types/global";
import { editProduct as editProductValidation } from "@/constants/formValidation";
import PageHolder from "@/app/PageHolder";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import InputField from "@/components/forms/InputField";
import TextAreaField from "@/components/forms/TextAreaField";
import MultiSelectorField from "@/components/forms/MultiSelectorField";
import SelectImageField from "@/components/forms/SelectImageField";
import SubmitButton from "@/components/forms/SubmitButton";

const EditProductPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const [currentImage, setCurrentImage] = useState<string | undefined>();
  const [isImageChanged, setIsImageChanged] = useState(false);

  const { data: productData, isFetching: isProductLoading, isError, error, refetch } = useGetProductSettingsById(Number(params.id));
  const { data: productImage, isFetching: isImgLoading } = useGetProductImage(Number(params.id));
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetAllCategories();

  const shouldFetchSub = Boolean(selectedCategory);
  const { data: subCategoriesData, isFetching: isSubCategoriesLoading, } = useGetSubCategoriesByCategory(
    shouldFetchSub ? selectedCategory : undefined,
    { enabled: shouldFetchSub }
  );

  const { mutateAsync: updateProduct } = useUpdateProduct();

  const product = productData?.data;
  const categories = categoriesData?.data || [];

  useEffect(() => {
    if (productImage && productImage instanceof Blob) {
      const url = URL.createObjectURL(productImage);
      setCurrentImage(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [productImage]);

  useEffect(() => {
    if (product?.category) {
      setSelectedCategory(String(product.category));
    }
  }, [product]);

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

    if (JSON.stringify(values.categories) !== JSON.stringify(initialValues.categories)) {
      values.categories.forEach((id) =>
        formData.append("categories[]", String(id))
      );
    }

    if (image) formData.append("image", image);
    else if (isImageChanged) formData.append("removeImage", "1");

    await updateProduct({ id: Number(params.id), data: formData });
    formik.setSubmitting(false);
  };

  const categoryOptions = categories.map((cat: Omit<Category, "desc">) => ({
    key: cat.title,
    value: cat.title,
  }));

  const subCategoryOptions =
    subCategoriesData?.data?.map((s: SubCategory) => ({
      key: s.title,
      value: String(s.id),
    })) || [];

  const goBack = () => router.back();

  return (
    <PageHolder title="Edit Product" desc="You can update this product's details.">
      {isProductLoading || isImgLoading ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage msg={error.message} action={refetch} />
      ) : !product ? (
        <EmptyElement
          title="Product Not Found"
          button={{ msg: "Go Back", action: goBack }}
        />
      ) : (
        <div className="bg-background p-8 border border-muted rounded-xl overflow-y-auto">
          <Formik
            enableReinitialize
            initialValues={product}
            validationSchema={editProductValidation}
            onSubmit={(values, helpers) => onSubmit(values, helpers, product)}
          >
            {({ setFieldValue, dirty, isValid, isSubmitting, }) => {
              return (
                <Form className="space-y-6">
                  <InputField
                    type="text"
                    name="title"
                    label="Product Name"
                    placeholder="Product Name..."
                    required
                  />

                  <InputField
                    type="text"
                    name="brand"
                    label="Brand"
                    placeholder="Brand..."
                    required
                  />

                  <InputField
                    inputMode="numeric"
                    name="price"
                    type="number"
                    label="Price"
                    placeholder="Price in SYP..."
                    required
                  />

                  <TextAreaField
                    name="desc"
                    label="Description"
                    placeholder="Enter a detailed description..."
                  />

                  {!isCategoriesLoading && (
                    <select
                      className="w-full border p-3 rounded-md bg-background"
                      value={selectedCategory}
                      onChange={(e) => {
                        const id = e.target.value;
                        setSelectedCategory(id);
                        setFieldValue("categories", []);
                      }}
                    >
                      <option value="" disabled>
                        Select Category
                      </option>

                      {categoryOptions.map((c: { value: string, key: string }) => (
                        <option key={c.value} value={c.value}>
                          {c.key}
                        </option>
                      ))}
                    </select>
                  )}

                  {selectedCategory && !isSubCategoriesLoading && (
                    <MultiSelectorField
                      name="categories"
                      label="Sub Categories"
                      options={subCategoryOptions}
                      required
                    />
                  )}

                  <SelectImageField
                    label="Product Image"
                    currentImage={currentImage}
                    value={image}
                    setValue={setImage}
                    setIsImageChanged={setIsImageChanged}
                  />

                  <div className="border-t border-muted" />

                  <SubmitButton
                    label="Update Product"
                    isSubmitting={isSubmitting}
                    isDirty={dirty || isImageChanged}
                    isValid={isValid}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </PageHolder>
  );
};

export default EditProductPage;
