"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import { useGetBrandById, useGetBrandImage, useUpdateBrand } from "@/hooks/useBrand";
import { BrandCreation } from "@/types/global";
import { createBrand as editBrandValidation } from "@/constants/formValidation";
import PageHolder from "@/app/dashboard/DashboardPageHolder";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import InputField from "@/components/forms/InputField";
import SelectImageField from "@/components/forms/SelectImageField";
import SubmitButton from "@/components/forms/SubmitButton";

const EditBrandPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const [image, setImage] = useState<File | undefined>();
  const [currentImage, setCurrentImage] = useState<string | undefined>();
  const [isImageChanged, setIsImageChanged] = useState(false);

  const { data: brandData, isFetching: isBrandLoading, isError, error, refetch } = useGetBrandById(Number(params.id));
  const { data: brandImage, isFetching: isImgLoading } = useGetBrandImage(Number(params.id));

  const { mutateAsync: updateBrand } = useUpdateBrand();
  const brand = brandData?.data;

  useEffect(() => {
    if (brandImage && brandImage instanceof Blob) {
      const url = URL.createObjectURL(brandImage);
      setCurrentImage(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [brandImage]);

  const goBack = () => router.back();

  const onSubmit = async (
    values: BrandCreation,
    formik: FormikHelpers<BrandCreation>,
    initialValues: BrandCreation
  ) => {
    const formData = new FormData();

    if (values.name !== initialValues.name) formData.append("name", values.name);

    if (image) formData.append("image", image);
    else if (isImageChanged) formData.append("removeImage", "1");

    await updateBrand({ id: Number(params.id), data: formData });
    formik.setSubmitting(false);
  };

  return (
    <PageHolder title="Edit Brand" desc="Update brand details including name and logo.">
      {isBrandLoading || isImgLoading ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage msg={error.message} action={refetch} />
      ) : !brand ? (
        <EmptyElement title="Brand Not Found" button={{ msg: "Go Back", action: goBack }} />
      ) : (
        <div className="bg-background p-8 border border-muted rounded-xl overflow-y-auto">
          <Formik
            enableReinitialize
            initialValues={{ name: brand.name }}
            validationSchema={editBrandValidation}
            onSubmit={(values, helpers) => onSubmit(values, helpers, { name: brand.name })}
          >
            {({ dirty, isValid, isSubmitting }) => (
              <Form className="space-y-6">
                <InputField
                  name="name"
                  type="text"
                  label="Brand Name"
                  placeholder="Enter brand name..."
                  required
                />

                <SelectImageField
                  label="Brand Logo"
                  currentImage={currentImage}
                  value={image}
                  setValue={setImage}
                  setIsImageChanged={setIsImageChanged}
                />

                <div className="border-t border-muted" />

                <SubmitButton
                  label="Update Brand"
                  isSubmitting={isSubmitting}
                  isDirty={dirty || isImageChanged}
                  isValid={isValid}
                />
              </Form>
            )}
          </Formik>
        </div>
      )}
    </PageHolder>
  );
};

export default EditBrandPage;
