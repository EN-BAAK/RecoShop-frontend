"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetProductImage } from "@/hooks/useProduct";
import { ProductImageProps } from "@/types/components";
import { useOnScreen } from "@/hooks/useHelpers";
import { Skeleton } from "./ui/skeleton";

const ProductImage: React.FC<ProductImageProps> = ({ id, imageStyle, title, }) => {
  const { isVisible, ref } = useOnScreen();
  const { data: profileImage, isFetching } = useGetProductImage({ id, enable: isVisible });

  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profileImage && profileImage instanceof Blob) {
      const url = URL.createObjectURL(profileImage);
      setProductImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [profileImage]);

  return (
    <div ref={ref} className="w-full h-full flex justify-center">
      {
        isFetching ? <Skeleton className="bg-muted h-full w-full" />
          : productImageUrl ? (
            <Image
              src={productImageUrl}
              alt={title}
              width={50}
              height={50}
              className={cn("h-full w-full", imageStyle)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="text-muted-foreground/30" size={50} />
            </div>
          )}
    </div>
  );
};

export default ProductImage;
