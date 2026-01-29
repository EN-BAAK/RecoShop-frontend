"use client";

import { Formik, Form, FormikHelpers } from "formik";
import { useCreateGroupBranch } from "@/hooks/useGroupBranch";
import { GroupBranchCreation } from "@/types/global";
import InputField from "@/components/forms/InputField";
import SubmitButton from "@/components/forms/SubmitButton";
import { groupBranch as initialValues } from "@/constants/formValues";
import { createGroupBranch as createGroupBranchValidation } from "@/constants/formValidation";

const AddGroupBranchForm: React.FC = () => {
  const { mutateAsync: createGroupBranch } = useCreateGroupBranch();

  const onSubmit = async (values: GroupBranchCreation, formik: FormikHelpers<GroupBranchCreation>) => {
    await createGroupBranch(values);
    formik.setSubmitting(false);
  };

  return (
    <section className="bg-background space-y-6 p-8 border border-muted rounded-xl">
      <div>
        <h2 className="font-sans font-semibold text-xl text-foreground">
          Branch Groups
        </h2>
        <p className="text-sm text-muted-foreground">
          Create groups to organize branches
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={createGroupBranchValidation}
      >
        {({ dirty, isValid, isSubmitting }) => (
          <Form className="space-y-6">
            <InputField
              name="name"
              type="text"
              label="Group Name"
              placeholder="Example: Damascus Area, North Region..."
              required
            />

            <SubmitButton
              isSubmitting={isSubmitting}
              isDirty={dirty}
              isValid={isValid}
              label="Add Group"
            />
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AddGroupBranchForm;
