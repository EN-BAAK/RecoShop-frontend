"use client";

import { useGetAllBranches } from "@/hooks/useBranch";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import BranchItem from "./Branch";
import { BranchGlobal } from "@/types/global";

const Branches: React.FC = () => {
  const { data, isFetching, isError, error, refetch } = useGetAllBranches();
  const branches = data?.data;

  return (
    <section className="space-y-4">
      <div >
        <h2 className="font-sans font-semibold text-xl text-foreground">
          Branches
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage branch locations and contact details
        </p>
      </div>

      {isFetching ? <LoadingPage />
        : isError ? <ErrorPage msg={error.message} action={refetch} />
          : (!branches || branches.length === 0) ? <EmptyElement
            title="No branches found"
            desc="Start by adding your first branch"
          />
            : <div className="space-y-3">
              {branches.map((branch: BranchGlobal) => (
                <BranchItem key={`branch-${branch.id}`} branch={branch} />
              ))}
            </div>
      }
    </section>
  );
};

export default Branches;
