"use client";

import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useCreateProduct } from "@/hooks/useProduct";
import { ProductCreation, SubCategory } from "@/types/global";
import SubmitButton from "@/components/forms/SubmitButton";
import InputField from "@/components/forms/InputField";
import TextAreaField from "@/components/forms/TextAreaField";
import MultiSelectorField from "@/components/forms/MultiSelectorField";
import SelectImageField from "@/components/forms/SelectImageField";
import PageHolder from "@/app/PageHolder";
import { useGetAllSubCategories } from "@/hooks/useSubCategory";
import { product as initialValues } from "@/constants/formValues";
import { createProduct as createProductValidation } from "@/constants/formValidation";

const CreateProductPage: React.FC = () => {
  const { mutateAsync: createProduct } = useCreateProduct();
  const { data: subCategories = [], isLoading } = useGetAllSubCategories();
  const [image, setImage] = useState<File | undefined>(undefined);


  const onSubmit = async (
    values: ProductCreation,
    formik: FormikHelpers<ProductCreation>
  ) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("brand", values.brand);
    formData.append("price", values.price.toString());
    formData.append("desc", values.desc);
    values.categories.forEach((cat: number) => formData.append("categories[]", String(cat)));
    if (image) formData.append("image", image);

    await createProduct(formData);
    formik.setSubmitting(false);
  };

  const categoryOptions = (false || [
    {
      id: 1,
      title: "hello",
      desc: "",
      categoryId: 2
    },
    {
      id: 2,
      title: "Bitch",
      desc: "",
      categoryId: 2
    },
    {
      id: 3,
      title: "Talal",
      desc: "",
      categoryId: 2
    },
    {
      id: 4,
      title: "Sakkal",
      desc: "",
      categoryId: 2
    },
  ]).map((cat: SubCategory) => ({
    key: cat.title,
    value: String(cat.id),
  }));

  return (
    <PageHolder
      title="إضافة منتج جديد"
      desc="قم بإضافة منتج جديد لتوسيع متجرك الإلكتروني."
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
                label="اسم المنتج"
                placeholder="مثال: سماعة بلوتوث، قميص رجالي..."
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
                placeholder="أدخل السعر بالليرة السورية..."
                required
              />

              <TextAreaField
                name="desc"
                label="الوصف"
                placeholder="أضف وصفاً تفصيلياً للمنتج..."
              />

              {!isLoading && (
                <MultiSelectorField
                  name="categories"
                  label="الفئات"
                  options={categoryOptions}
                  required
                  styles="font-sans"
                />
              )}

              <SelectImageField
                label="صورة المنتج"
                value={image}
                setValue={setImage}
                className="mt-4"
              />

              <div className="border-t border-muted" />

              <SubmitButton
                isSubmitting={isSubmitting}
                isDirty={dirty}
                isValid={isValid}
                label="إضافة المنتج"
              />
            </Form>
          )}
        </Formik>
      </div>
    </PageHolder>
  );
};

export default CreateProductPage;
