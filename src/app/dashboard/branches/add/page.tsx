"use client";

import PageHolder from "@/app/dashboard/DashboardPageHolder";
import AddBranchForm from "./AddBranchForm";
import AddGroupBranchForm from "./AddGroupBranchForm";

const AddBranchPage: React.FC = () => {
  return (
    <PageHolder
      title="Add Branches"
      desc="Create new branches or organize them into groups."
    >
      <div className="space-y-10 overflow-y-auto">
        <AddGroupBranchForm />

        <div className="border-t border-muted" />

        <AddBranchForm />
      </div>
    </PageHolder>
  );
};

export default AddBranchPage;
