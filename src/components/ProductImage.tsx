"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetProductImage } from "@/hooks/useProduct";
import { ProductImageProps } from "@/types/components";

const ProductImage: React.FC<ProductImageProps> = ({
  id,
  imageStyle,
  title,
}) => {
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
    <React.Fragment>
      {
        productImageUrl ? (
          <Image
            src={productImageUrl}
            alt={title}
            width={50}
            height={50}
            loading="lazy"
            className={cn("h-full w-full", imageStyle)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="text-muted-foreground/30" size={50} />
          </div >
        )}
    </React.Fragment>
  );
};

export default ProductImage;
