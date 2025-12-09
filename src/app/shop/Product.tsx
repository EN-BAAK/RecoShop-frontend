"use client"

import { ShoppingCart } from "lucide-react";
import { ShopProductProps } from "@/types/components";
import CustomButton from "@/components/forms/Button";
import ProductImage from "@/components/ProductImage";
import BrandImage from "./BrandImage";
import { cn } from "@/lib/utils";

const ProductCard: React.FC<ShopProductProps> = ({ product, dir = "vertical" }) => {
  const isHorizontal = dir === "horizontal"

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <div className={cn(
      "transition-all duration-300 ease-in-out",
      !isHorizontal && "h-full min-w-[280px] sm:min-w-[300px] lg:min-w-[320px] max-w-[320px] mx-2"
    )}>
      <div className={cn(
        "bg-background h-full p-1 flex border border-muted rounded-lg shadow-sm relative overflow-hidden transform transition-all duration-300 group hover:shadow-lg hover:-translate-y-1",
        isHorizontal ? "sm:flex-row flex-col" : "flex-col"
      )}>

        <div className={cn(
          "p-1 border-b border-muted rounded-md overflow-hidden",
          isHorizontal ? "h-48 sm:w-65 w-full me-2" : "w-full h-48"
        )}>
          <ProductImage id={product.id} title={product.title} imageStyle="rounded-md" />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="p-4 flex-1 border-b border-muted">
            <h3 className="mb-1 truncate font-heading font-bold text-lg text-primary">
              {product.title}
            </h3>

            <div className="mb-3 flex items-center gap-1">
              <div className="w-6 h-6">
                <BrandImage title={product.brand} />
              </div>

              <p className="text-xs text-muted-foreground">
                {product.brand}
              </p>
            </div>

            <span className="mb-1 flex-grow line-clamp-2 text-sm text-foreground/90">
              {product.desc}
            </span>
          </div>

          <div className="mt-auto p-2 flex justify-between items-center">
            <span className="font-sans font-bold text-md text-accent">
              {formattedPrice}
            </span>

            <CustomButton
              label="Cart"
              icon={ShoppingCart}
              iconClassName="h-3 w-3"
              className="w-fit rounded-md text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard