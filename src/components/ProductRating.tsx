"use client"

import { useGetAvgRateForProduct, useGetMyRateForProduct, useRateProduct } from "@/hooks/useRate";
import { range } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ProductRatingProps } from "@/types/components";
import { Star } from "lucide-react";
import React, { useState } from "react";

const ProductRating: React.FC<ProductRatingProps> = ({ productId }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const { data: dataAvgRating } = useGetAvgRateForProduct(productId)
  const { data: dataMyRating } = useGetMyRateForProduct(productId)
  const { mutateAsync, isPending } = useRateProduct();

  const averageRate = dataAvgRating?.data.averageRate || 0.0
  const ratesCount = dataAvgRating?.data.ratesCount || 0
  const myRating = dataMyRating?.data.rate || 0

  const onRate = async (rate: number) => {
    if (isPending) return;

    await mutateAsync({
      productId,
      rate,
    });
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {range(1, 5).map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="cursor-pointer transition-transform hover:scale-110"
            disabled={isPending}
            onClick={() => onRate(star)}
          >
            <Star
              size={20}
              className={cn(
                "transition-colors",
                star <= (hoverRating || myRating) ? "fill-accent text-accent" : "text-muted"
              )}
            />
          </button>
        ))}
      </div>
      <span className="font-sans text-sm text-foreground">{averageRate} ({ratesCount} reviews)</span>
    </div>
  );
};

export default ProductRating