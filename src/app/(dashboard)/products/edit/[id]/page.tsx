"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import { useGetProductById, useUpdateProduct } from "@/hooks/useProduct";
import { useGetAllSubCategories } from "@/hooks/useSubCategory";
import { ProductCreation, SubCategory } from "@/types/global";
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

  const [image, setImage] = useState<File | undefined>(undefined);

  const { data: productData, isFetching, isError, error, refetch } =
    useGetProductById(Number(params.id));

  const { data: subCategories = [], isLoading } = useGetAllSubCategories();
  const { mutateAsync: updateProduct } = useUpdateProduct();

  const product = productData?.data || {
    id: 1,
    title: "da",
    desc: "fa",
    price: 50,
    brand: "dd"
  };

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

    if (JSON.stringify(values.categories) !== JSON.stringify(initialValues.categories)) {
      values.categories.forEach((cat: number) =>
        formData.append("categories[]", String(cat))
      );
    }

    if (image) formData.append("image", image);

    await updateProduct({ id: Number(params.id), data: formData });
    formik.setSubmitting(false);
  };

  const categoryOptions = subCategories.map((cat: SubCategory) => ({
    key: cat.title,
    value: String(cat.id),
  }));

  return (
    <PageHolder
      title="تعديل المنتج"
      desc="يمكنك تعديل بيانات المنتج الحالية"
    >
      {isFetching ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage action={refetch} msg={error.message} />
      ) : product ? (
        <EmptyElement
          title="المنتج غير موجود"
          button={{
            action: goBack,
            msg: "العودة",
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
                  label="اسم المنتج"
                  placeholder="اسم المنتج..."
                  required
                />

                <InputField
                  name="brand"
                  type="text"
                  label="العلامة التجارية"
                  placeholder="اسم الشركة المصنعة..."
                  required
                />

                <InputField
                  name="price"
                  type="number"
                  label="السعر"
                  placeholder="السعر بالليرة السورية..."
                  required
                />

                <TextAreaField
                  name="desc"
                  label="الوصف"
                  placeholder="الوصف التفصيلي للمنتج..."
                />

                {!isLoading && (
                  <MultiSelectorField
                    name="categories"
                    label="الفئات"
                    options={categoryOptions}
                    required
                  />
                )}

                <SelectImageField
                  label="تغيير صورة المنتج (اختياري)"
                  value={image}
                  setValue={setImage}
                />

                <div className="border-t border-muted" />

                <SubmitButton
                  isSubmitting={isSubmitting}
                  isDirty={dirty}
                  isValid={isValid}
                  label="تحديث المنتج"
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
