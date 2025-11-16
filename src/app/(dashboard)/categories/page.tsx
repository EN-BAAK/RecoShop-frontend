"use client";

import React from "react";
import { useGetAllCategories } from "@/hooks/useCategory";
import { Category as CategoryType } from "@/types/global";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import Category from "./Category";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CustomButton from "@/components/forms/Button";
import { PlusCircle } from "lucide-react";
import PageHolder from "@/app/PageHolder";

const CategoriesPage: React.FC = () => {
  const router = useRouter();
  const { data, isFetching, isError, error, refetch } = useGetAllCategories();

  const handleAddNewCategory = () => {
    router.push("/categories/add");
  };

  const categories = data?.data || [];

  return (
    <PageHolder
      title="Manage Categories"
      desc="Easily manage your product categories to better organize your online store."
      outerElement={
        <Link href="/categories/add" passHref>
          <CustomButton
            label="Add New Category"
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
      ) : categories.length === 0 ? (
        <EmptyElement
          title="No Categories Yet"
          desc="Start by adding a new category to organize your products."
          button={{
            action: handleAddNewCategory,
            msg: "Add New Category",
          }}
        />
      ) : (
        <div className="overflow-y-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category: CategoryType) => (
              <Category key={category.id} category={category} />
            ))}
          </div>
        </div>
      )}
    </PageHolder>
  );
};

export default CategoriesPage;
