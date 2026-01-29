"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import { BranchCreation, GroupBranchCreation } from "@/types/global";
import { editGroupBranch as editGroupBranchValidation } from "@/constants/formValidation";
import InputField from "@/components/forms/InputField";
import SubmitButton from "@/components/forms/SubmitButton";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import PageHolder from "@/app/dashboard/DashboardPageHolder";
import { useGetAllGroupsBranchById, useUpdateGroupBranch } from "@/hooks/useGroupBranch";

const EditGroupPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const { data: GroupData, isFetching, isError, error, refetch } = useGetAllGroupsBranchById(Number(params.id));
  const { mutateAsync: updateBranch } = useUpdateGroupBranch();

  const group = GroupData?.data;

  const goBack = () => router.back();

  const onSubmit = async (values: GroupBranchCreation, formik: FormikHelpers<GroupBranchCreation>, initialValues: GroupBranchCreation) => {
    const changedValues: Partial<BranchCreation> = {};

    if (values.name !== initialValues.name) changedValues.name = values.name;

    await updateBranch({ id: Number(params.id), data: changedValues });
    formik.setSubmitting(false);
  };

  return (
    <PageHolder
      title="Edit Group Branch Area"
      desc="Modify the details of the selected branch."
    >
      {isFetching ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage action={refetch} msg={error.message} />
      ) : !group ? (
        <EmptyElement
          title="Branch Area Not Found"
          button={{ action: goBack, msg: "Back to Branches" }}
        />
      ) : (
        <div className="p-8 border border-muted rounded-xl overflow-y-auto">
          <Formik
            enableReinitialize
            initialValues={group}
            validationSchema={editGroupBranchValidation}
            onSubmit={(values, helpers) => onSubmit(values, helpers, group)}
          >
            {({ dirty, isValid, isSubmitting }) => (
              <Form className="space-y-6">
                <InputField
                  name="name"
                  label="Branch Name"
                  placeholder="Example: Damascus"
                  required
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

export default EditGroupPage;
