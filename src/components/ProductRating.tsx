"use client"

import { cn } from "@/lib/utils";
import { ProductRatingProps } from "@/types/components";
import { range } from "lodash";
import { Star } from "lucide-react";
import React, { useState } from "react";

const ProductRating: React.FC<ProductRatingProps> = ({ rating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {range(1, 5).map((star) => (
          <button
            key={star}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="cursor-pointer transition-transform hover:scale-110"
          >
            <Star
              size={20}
              className={cn(
                "transition-colors",
                star <= (hoverRating || rating) ? "fill-accent text-accent" : "text-muted"
              )}
            />
          </button>
        ))}
      </div>
      <span className="font-sans text-sm text-foreground">{rating}.0 (245 reviews)</span>
    </div>
  );
};

export default ProductRating