"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import { BranchCreation, GroupBranch } from "@/types/global";
import { editBranch as editBranchValidation } from "@/constants/formValidation";
import InputField from "@/components/forms/InputField";
import SubmitButton from "@/components/forms/SubmitButton";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import PageHolder from "@/app/dashboard/DashboardPageHolder";
import SelectorField from "@/components/forms/SelectorField";
import { useGetAllGroupsBranches } from "@/hooks/useGroupBranch";
import { useGetBranchById, useUpdateBranch } from "@/hooks/useBranch";

const EditBranchPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const { data: branchData, isFetching, isError, error, refetch } = useGetBranchById(Number(params.id));
  const { data } = useGetAllGroupsBranches();
  const { mutateAsync: updateBranch } = useUpdateBranch();

  const groupsData = data?.data || [];

  const groupOptions = groupsData.map((group: GroupBranch) => ({
    key: group.name,
    value: String(group.id),
  })) || [];

  const branch = branchData?.data;

  const goBack = () => router.back();

  const onSubmit = async (values: BranchCreation, formik: FormikHelpers<BranchCreation>, initialValues: BranchCreation) => {
    const changedValues: Partial<BranchCreation> = {};

    if (values.name !== initialValues.name) changedValues.name = values.name;
    if (values.location !== initialValues.location) changedValues.location = values.location;
    if (values.facebook !== initialValues.facebook) changedValues.facebook = values.facebook;
    if (values.instagram !== initialValues.instagram) changedValues.instagram = values.instagram;
    if (values.phone !== initialValues.phone) changedValues.phone = values.phone;
    if (values.telephone !== initialValues.telephone) changedValues.telephone = values.telephone;
    if (values.groupId !== initialValues.groupId) changedValues.groupId = values.groupId;

    await updateBranch({ id: Number(params.id), data: changedValues });
    formik.setSubmitting(false);
  };

  return (
    <PageHolder
      title="Edit Branch"
      desc="Modify the details of the selected branch."
    >
      {isFetching ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage action={refetch} msg={error.message} />
      ) : !branch ? (
        <EmptyElement
          title="Branch Not Found"
          button={{ action: goBack, msg: "Back to Branches" }}
        />
      ) : (
        <div className="p-8 border border-muted rounded-xl overflow-y-auto">
          <Formik
            enableReinitialize
            initialValues={branch}
            validationSchema={editBranchValidation}
            onSubmit={(values, helpers) => onSubmit(values, helpers, branch)}
          >
            {({ dirty, isValid, isSubmitting }) => (
              <Form className="space-y-6">
                <InputField
                  name="name"
                  label="Branch Name"
                  placeholder="Example: RecoShop Damascus"
                  required
                  type="text"
                />

                <InputField
                  name="location"
                  label="Location"
                  placeholder="City, street, landmark..."
                  type="text"
                />

                <SelectorField
                  name="groupId"
                  label="Group"
                  options={groupOptions}
                  styles="font-sans"
                />

                <InputField
                  name="phone"
                  label="Phone"
                  placeholder="+963 9xx xxx xxx"
                  type="text"
                />

                <InputField
                  name="telephone"
                  label="Telephone"
                  placeholder="011 xxxx xxx"
                  type="text"
                  inputMode="numeric"
                />

                <InputField
                  name="facebook"
                  label="Facebook"
                  placeholder="https://facebook.com/branch"
                  type="text"
                />

                <InputField
                  name="instagram"
                  label="Instagram"
                  placeholder="https://instagram.com/branch"
                  type="text"
                />

                <div className="border-t border-muted" />

                <SubmitButton
                  isSubmitting={isSubmitting}
                  isDirty={dirty}
                  isValid={isValid}
                  label="Add Branch"
                />
              </Form>
            )}
          </Formik>
        </div>
      )}
    </PageHolder>
  );
};

export default EditBranchPage;
