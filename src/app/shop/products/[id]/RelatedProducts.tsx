"use client"

import LoadingPage from "@/components/LoadingPage";
import { useGetRelatedProducts } from "@/hooks/useProduct";
import { ShopRelatedProductsProps } from "@/types/components";
import ProductCard from "../../Product";
import { ShopProduct } from "@/types/global";

const RelatedProducts: React.FC<ShopRelatedProductsProps> = ({ id }) => {
  const { data, isFetching, isError } = useGetRelatedProducts(id)
  const products = data?.data || []

  if (isFetching)
    return <LoadingPage />

  if (isError || !products.length)
    return <></>

  return (
    <div className="mt-4 py-4 space-y-4 border-y border-muted">
      <h3 className="text-lg font-heading font-semibold text-primary">Related Products</h3>
      <div className="space-y-3">
        {products.map((product: ShopProduct) => (
          <ProductCard dir="horizontal" product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts