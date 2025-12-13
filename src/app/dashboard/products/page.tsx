"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { useGetAllProducts } from "@/hooks/useProduct";
import PageHolder from "@/app/dashboard/DashboardPageHolder";
import CustomButton from "@/components/forms/Button";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import { ProductGlobal } from "@/types/global";
import Product from "./Product";
import { useEffect, useRef } from "react";

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const { data, isLoading: isFetching, isError, error, refetch, fetchNextPage, hasNextPage, } = useGetAllProducts({ limit: 12 })

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const products = data?.pages?.flatMap((page) => page.data.items) ?? [];

  const handleAddNewProduct = () => router.push("products/add")

  useEffect(() => {
    if (!loadMoreRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {

        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      },
      {
        root: containerRef.current,
        rootMargin: "250px",
        threshold: 0,
      }
    );

    const currentRef = loadMoreRef.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetching, fetchNextPage]);

  return (
    <PageHolder
      title="Product Management"
      desc="Flexible management for your products to simplify organizing your online store and viewing all details."
      outerElement={
        <Link href="products/add" passHref>
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
        <div className="overflow-y-auto" ref={containerRef}>
          <div className="grid grid-cols-1 gap-6 xs:gird-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: ProductGlobal) => (
              <Product key={product.id} product={product} />
            ))}
          </div>

          {hasNextPage && <LoadingPage ref={loadMoreRef} className="w-full py-2" />}
        </div>
      )}
    </PageHolder>
  );
};

export default ProductsPage;