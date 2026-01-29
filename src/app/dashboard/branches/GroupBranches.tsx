"use client";

import { useGetAllGroupsBranches } from "@/hooks/useGroupBranch";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import { GroupBranch as GroupBranchType } from "@/types/global";
import GroupBranch from "./GroupBranch";

const GroupBranches: React.FC = () => {
  const { data, isFetching, isError, error, refetch } = useGetAllGroupsBranches();
  const groups = data?.data;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-sans font-semibold text-xl text-foreground">
          Branch Groups
        </h2>
        <p className="text-sm text-muted-foreground">
          Organize branches into logical groups
        </p>
      </div>

      {isFetching ? <LoadingPage />
        : isError ? <ErrorPage msg={error.message} action={refetch} />
          : (!groups || groups.length === 0) ? <EmptyElement
            title="No branch groups yet"
            desc="Create your first group to organize branches" />
            : <div className="flex flex-wrap gap-2">
              {groups.map((group: GroupBranchType) => (
                <GroupBranch group={group} key={`branch-area-${group.id}`} />
              ))}
            </div>
      }
    </section>
  );
};

export default GroupBranches;
