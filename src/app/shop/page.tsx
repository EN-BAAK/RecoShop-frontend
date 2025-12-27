"use client";

import React from "react";
import { useGetAllCategories } from "@/hooks/useCategory";
import Section from "./Section";
import { Category } from "@/types/global";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";

const ShopPage: React.FC = () => {
  const { data: categoriesData, isFetching, isError, refetch, error } = useGetAllCategories();
  const categories = categoriesData?.data || []

  if (isFetching)
    return <LoadingPage className="flex-1" />

  if (isError)
    return <ErrorPage className="flex-1" action={refetch} msg={error?.message} />

  if (!categories.length)
    return <EmptyElement className="flex-1" title="There are no products yet" />

  return (
    <React.Fragment>
      <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-foreground">
            Discover Our Collections
          </h1>
          <p className="mt-3 text-lg text-foreground/80">
            Fresh inventory added daily. Find what you need.
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {categories.map((category: Category) => (
          <Section key={category.id} category={category.title} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default ShopPage;
