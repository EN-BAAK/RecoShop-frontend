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
import Product from "./product";

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
      title="إدارة المنتجات"
      desc="إدارة مرنة لمنتجاتك لتسهيل تنظيم متجرك الإلكتروني وعرض جميع التفاصيل."
      outerElement={
        <Link href="/products/add" passHref>
          <CustomButton
            label="إضافة منتج جديد"
            className="w-fit rounded-full absolute bottom-8 left-8 z-50"
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
          title="لا توجد منتجات حالياً"
          desc="ابدأ بإضافة منتج جديد لعرضه في متجرك الإلكتروني"
          button={{
            action: handleAddNewProduct,
            msg: "إضافة منتج جديد",
          }}
        />
      ) : (
        <div className="overflow-y-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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