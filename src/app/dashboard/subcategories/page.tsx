"use client";

import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { useGetAllSubCategories } from "@/hooks/useSubCategory";
import { SubCategoryGlobal } from "@/types/global";
import PageHolder from "@/app/dashboard/DashboardPageHolder";
import Link from "next/link";
import CustomButton from "@/components/forms/Button";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import SubCategory from "./SubCategory";

const SubCategoriesPage: React.FC = () => {
  const router = useRouter();
  const { data, isFetching, isError, error, refetch } = useGetAllSubCategories();

  const subcategories = data?.data || [];

  const handleAddNew = () => {
    router.push("subcategories/add");
  };

  return (
    <PageHolder
      title="Subcategory Management"
      desc="Manage your subcategories to better organize your products within the main categories."
      outerElement={
        <Link href="subcategories/add" passHref>
          <CustomButton
            label="Add New Subcategory"
            className="w-fit rounded-full absolute bottom-8 left-8 z-50"
            icon={PlusCircle}
          />
        </Link>
      }
    >
      {isFetching ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage action={refetch} msg={error.message} />
      ) : subcategories.length === 0 ? (
        <EmptyElement
          title="No Subcategories"
          desc="Start by adding a new subcategory to better organize your products."
          button={{
            action: handleAddNew,
            msg: "Add New Subcategory",
          }}
        />
      ) : (
        <div className="overflow-y-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subcategories.map((subcategory: SubCategoryGlobal) => (
              <SubCategory key={subcategory.id} subCategory={subcategory} />
            ))}
          </div>
        </div>
      )}
    </PageHolder>
  );
};

export default SubCategoriesPage;
