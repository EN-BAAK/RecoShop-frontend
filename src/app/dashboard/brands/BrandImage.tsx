"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetBrandImage } from "@/hooks/useBrand";
import { BrandImageProps } from "@/types/components";

const BrandImage: React.FC<BrandImageProps> = ({ id, height = 35, width = 35, imageStyle, title }) => {
  const { data: profileImage } = useGetBrandImage(id);
  const [brandImageUrl, setBrandImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profileImage && profileImage instanceof Blob) {
      const url = URL.createObjectURL(profileImage);
      setBrandImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [profileImage]);

  return (
    <React.Fragment>
      {(brandImageUrl) ? (
        <Image
          width={width}
          height={height}
          src={brandImageUrl}
          alt={title}
          className={cn(
            `rounded-full revert-layer`,
            imageStyle,
          )}
          loading="lazy"
        />
      ) : (
        <div className={`bg-muted rounded-lg flex items-center justify-center relative overflow-hidden`}
          style={{ height: `${height}px`, width: `${width}px` }}>
          <Package className="text-muted-foreground/30" width={width / 4} height={height / 4} />
        </div>
      )}
    </React.Fragment>
  );
};

export default BrandImage;