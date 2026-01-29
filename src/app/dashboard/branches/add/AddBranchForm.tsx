"use client";

import { Formik, Form, FormikHelpers } from "formik";
import { useCreateBranch } from "@/hooks/useBranch";
import { useGetAllGroupsBranches } from "@/hooks/useGroupBranch";
import { BranchCreation, GroupBranch } from "@/types/global";
import InputField from "@/components/forms/InputField";
import SubmitButton from "@/components/forms/SubmitButton";
import SelectorField from "@/components/forms/SelectorField";
import { branch as initialValues } from "@/constants/formValues";
import { createBranch as createBranchValidation } from "@/constants/formValidation";

const AddBranchForm: React.FC = () => {
  const { mutateAsync: createBranch } = useCreateBranch();
  const { data } = useGetAllGroupsBranches();
  const groupsData = data?.data || [];

  const groupOptions = groupsData.map((group: GroupBranch) => ({
    key: group.name,
    value: String(group.id),
  })) || [];

  const onSubmit = async (values: BranchCreation, formik: FormikHelpers<BranchCreation>) => {
    await createBranch(values);
    formik.setSubmitting(false);
  };

  return (
    <section className="bg-background space-y-6 p-8 border border-muted rounded-xl">
      <div>
        <h2 className="font-sans font-semibold text-xl text-foreground">
          Branch
        </h2>
        <p className="text-sm text-muted-foreground">
          Add a new branch with contact and location details
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={createBranchValidation}
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
    </section>
  );
};

export default AddBranchForm;
