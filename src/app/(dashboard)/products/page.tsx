"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { useGetAllProducts } from "@/hooks/useProduct";
import PageHolder from "@/app/PageHolder";
import CustomButton from "@/components/forms/Button";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import { ProductGlobal } from "@/types/global";
import Product from "./Product";

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const {
    data,
    isLoading: isFetching,
    isError,
    error,
    refetch,
  } = useGetAllProducts();

  const products = data?.data || []

  const handleAddNewProduct = () => router.push("/products/add")

  return (
    <PageHolder
      title="Product Management"
      desc="Flexible management for your products to simplify organizing your online store and viewing all details."
      outerElement={
        <Link href="/products/add" passHref>
          <CustomButton
            label="Add New Product"
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
      ) : products.length === 0 ? (
        <EmptyElement
          title="There are no products yet"
          desc="Start by adding a new product to display it in your store"
          button={{
            action: handleAddNewProduct,
            msg: "Add New Product",
          }}
        />
      ) : (
        <div className="overflow-y-auto">
          <div className="grid grid-cols-1 gap-6 xs:gird-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: ProductGlobal) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </PageHolder>
  );
};

export default ProductsPage;