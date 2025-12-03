"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetProductImage } from "@/hooks/useProduct";
import { ProductImageProps } from "@/types/components";

const ProductImage: React.FC<ProductImageProps> = ({ id, height = 35, width = 35, imageStyle, containerStyle, title }) => {
  const { data: profileImage } = useGetProductImage(id);
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profileImage && profileImage instanceof Blob) {
      const url = URL.createObjectURL(profileImage);
      setProductImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [profileImage]);

  return (
    <div className={cn(
      `h-[${height}px]`,
      containerStyle
    )}>
      {(productImageUrl) ? (
        <Image
          width={width}
          height={height}
          src={productImageUrl}
          alt={title}
          className={cn(
            `h-[${height}px] w-full `,
            imageStyle,
          )}
          loading="lazy"
        />
      ) : (
        <div className={`bg-muted mb-4 rounded-lg flex items-center justify-center relative overflow-hidden`}
          style={{ height: `${height}px` }}>
          <Package className="text-muted-foreground/30" width={width / 2} height={height / 2} />
        </div>
      )}
    </div>
  );
};

export default ProductImage;