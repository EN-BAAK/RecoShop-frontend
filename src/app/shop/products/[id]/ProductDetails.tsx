"use client"

import BrandImage from "@/components/BrandImage";
import ProductRating from "@/components/ProductRating";
import ProductComments from "./ProductComments";
import { ShopProductDetailsProps } from "@/types/components";
import ProductImage from "@/components/ProductImage";
import CustomButton from "@/components/forms/Button";
import { ShoppingCart } from "lucide-react";
import { useShopContext } from "@/contexts/ShopProvider";

const ProductDetails: React.FC<ShopProductDetailsProps> = ({ product }) => {
  const { pushToCart } = useShopContext()
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="space-y-6">
      <div className="sm:flex md:block xl:flex gap-3">
        <div className="bg-muted sm:w-40 md:w-full xl:w-80 w-full sm:max-h-70 md:h-80 max-h-50 p-1 flex justify-center items-center">
          <ProductImage id={product.id} title={product.title} imageStyle="w-auto rounded-lg object-contain" />
        </div>

        <div className="flex-1">
          <h1 className="mb-3 font-heading font-bold text-3xl text-primary">{product.title}</h1>

          <div className="mb-4 flex items-center gap-3">
            <div className="w-8 h-8">
              <BrandImage title={product.brand} />
            </div>

            <span className="font-heading font-semibold text-foreground">{product.brand}</span>
          </div>

          <ProductRating rating={3} />

          <div className="py-4 border-y border-muted">
            <p className="font-heading font-bold text-3xl text-accent">
              {priceFormatter.format(product.price)}
            </p>
          </div>

          <p className="leading-relaxed text-foreground">{product.desc}</p>

          <CustomButton
            label="Cart"
            icon={ShoppingCart}
            iconClassName="h-3 w-3"
            onClick={() => pushToCart({ id: product.id, price: product.price, title: product.title })}
            className="w-fit mt-4 rounded-md text-xs"
          />
        </div>
      </div>


      <ProductComments />
    </div>
  );
};

export default ProductDetails