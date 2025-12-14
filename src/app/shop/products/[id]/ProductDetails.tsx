"use client"

import BrandImage from "@/components/BrandImage";
import ProductRating from "@/components/ProductRating";
import ProductComments from "./ProductComments";
import { ShopProductDetailsProps } from "@/types/components";
import ProductImage from "@/components/ProductImage";

const ProductDetails: React.FC<ShopProductDetailsProps> = ({ product }) => {
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="space-y-6">
      <div className="bg-muted w-full sm:h-70 md:h-80 h-50 p-1 flex justify-center items-center">
        <ProductImage id={product.id} title={product.title} imageStyle="w-auto rounded-lg object-contain" />
      </div>

      <div>
        <h1 className="mb-3 font-heading font-bold text-3xl text-primary">{product.title}</h1>

        <div className="mb-4 flex items-center gap-3">
          <div className="w-8 h-8">
            <BrandImage title={product.brand} />
          </div>

          <span className="font-heading font-semibold text-foreground">{product.brand}</span>
        </div>

        <ProductRating rating={3} />
      </div>

      <div className="py-4 border-y border-muted">
        <p className="font-heading font-bold text-3xl text-accent">
          {priceFormatter.format(product.price)}
        </p>
      </div>

      <p className="leading-relaxed text-foreground">{product.desc}</p>

      <ProductComments />
    </div>
  );
};

export default ProductDetails