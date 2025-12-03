"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import PageHolder from "@/app/PageHolder";
import CustomButton from "@/components/forms/Button";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import { Brand as BrandType } from "@/types/global";
import { useGetAllBrands } from "@/hooks/useBrand";
import Brand from "./Brand";

const BrandPage: React.FC = () => {
  const router = useRouter();
  const { data, isLoading: isFetching, isError, error, refetch, } = useGetAllBrands();

  const brands = data?.data || []

  const handleAddNewBrand = () => router.push("brands/add")

  return (
    <PageHolder
      title="Product Management"
      desc="Flexible management for your products to simplify organizing your online store and viewing all details."
      outerElement={
        <Link href="brands/add" passHref>
          <CustomButton
            label="Add New Brand"
            className="w-fit rounded-full absolute bottom-2 left-8 z-50"
            icon={PlusCircle}
          />
        </Link>
      }
    >
      {isFetching ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage action={refetch} msg={error?.message} />
      ) : brands.length === 0 ? (
        <EmptyElement
          title="There are no brands yet"
          desc="Start by adding a new brand to display it in your store"
          button={{
            action: handleAddNewBrand,
            msg: "Add New Brand",
          }}
        />
      ) : (
        <div className="overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 xs:gird-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6">
            {brands.map((brand: BrandType) => (
              <Brand key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      )}
    </PageHolder>
  );
};

export default BrandPage;