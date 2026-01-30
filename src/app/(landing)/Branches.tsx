"use client";

import React from "react";
import { useGetAllBranches } from "@/hooks/useBranch";
import { BranchGlobal } from "@/types/global";
import BranchCard from "./Branch";
import SectionHolder from "./SectionHolder";

const groupBranchesByGroup = (branches: BranchGlobal[]) =>
  branches.reduce<Record<string, BranchGlobal[]>>((acc, b) => {
    acc[b.group] = acc[b.group] || [];
    acc[b.group].push(b);
    return acc;
  }, {});

const Branches: React.FC = () => {
  const { data, isFetching } = useGetAllBranches();
  const branches: BranchGlobal[] = data?.data || [];

  if (!isFetching && !branches.length) return null;

  const grouped = groupBranchesByGroup(branches);

  return (
    <SectionHolder title="Our Branches" desc="Find a store near you and experience our services in person" decoration >
      <div className="relative">

        <span className="bg-emerald-600 h-full w-[2px] absolute left-1/2 -translate-x-1/2 top-0" />

        <div className="space-y-16">
          {Object.entries(grouped).map(([groupName, groupBranches], gIndex) => (
            <div key={groupName} className="relative space-y-8">

              <div className="text-center relative z-10">
                <span className="bg-emerald-600 py-1 px-4 rounded-md inline-block font-semibold text-background">
                  {groupName}
                </span>
              </div>

              <div className="relative">
                {groupBranches.map((branch, i) => (
                  <BranchCard
                    key={branch.id}
                    branch={branch}
                    side={(i + gIndex) % 2 === 0 ? "left" : "right"}
                  />
                ))}
                <div className="clear-both" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionHolder>
  );
};

export default Branches;
