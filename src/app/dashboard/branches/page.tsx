"use client";

import PageHolder from "@/app/dashboard/DashboardPageHolder";
import GroupBranches from "./GroupBranches";
import Branches from "./Branches";
import CustomButton from "@/components/forms/Button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const BranchesPage: React.FC = () => {
  return (
    <PageHolder
      title="Branch Management"
      desc="Manage all your branches, organize them into groups, and keep contact details up to date."
      outerElement={
        <Link passHref href="branches/add">
          <CustomButton
            label="Add Branch"
            className="w-fit rounded-full absolute bottom-2 left-8 z-50"
            icon={PlusCircle}
          />
        </Link>
      }
    >
      <div className="space-y-8 overflow-y-auto">
        <GroupBranches />
        <div className="border-t border-muted" />
        <Branches />
      </div>
    </PageHolder>
  );
};

export default BranchesPage;
