"use client";

import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useCreateBrand } from "@/hooks/useBrand";
import { BrandCreation } from "@/types/global";
import SubmitButton from "@/components/forms/SubmitButton";
import InputField from "@/components/forms/InputField";
import SelectImageField from "@/components/forms/SelectImageField";
import PageHolder from "@/app/PageHolder";
import { createBrand as createBrandValidation } from "@/constants/formValidation";
import { brand as initialValues } from "@/constants/formValues";

const CreateBrandPage: React.FC = () => {
  const [image, setImage] = useState<File | undefined>(undefined);

  const { mutateAsync: createBrand } = useCreateBrand();

  const onSubmit = async (
    values: BrandCreation,
    formik: FormikHelpers<BrandCreation>
  ) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (image) formData.append("image", image);

    await createBrand(formData);
    formik.setSubmitting(false);
  };

  return (
    <PageHolder
      title="Add New Brand"
      desc="Add a new brand to your store."
    >
      <div className="bg-background p-8 border border-muted rounded-xl overflow-y-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={createBrandValidation}
          onSubmit={onSubmit}
        >
          {({ dirty, isValid, isSubmitting }) => (
            <Form className="space-y-6">
              <InputField
                name="name"
                type="text"
                label="Brand Name"
                placeholder="Example: Samsung, Nike..."
                required
              />

              <SelectImageField
                label="Brand Logo"
                value={image}
                setValue={setImage}
                className="mt-4"
              />

              <div className="border-t border-muted" />

              <SubmitButton
                isSubmitting={isSubmitting}
                isDirty={dirty}
                isValid={isValid}
                label="Add Brand"
              />
            </Form>
          )}
        </Formik>
      </div>
    </PageHolder>
  );
};

export default CreateBrandPage;
