"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetBrandImageByName } from "@/hooks/useBrand";
import { ShopBrandImagProps } from "@/types/components";
import { useOnScreen } from "@/hooks/useHelpers";

const BrandImage: React.FC<ShopBrandImagProps> = ({ imageStyle, title }) => {
  const { isVisible, ref } = useOnScreen();
  const { data: profileImage } = useGetBrandImageByName({ name: title, enable: isVisible });
  const [brandImageUrl, setBrandImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profileImage && profileImage instanceof Blob) {
      const url = URL.createObjectURL(profileImage);
      setBrandImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [profileImage]);

  return (
    <div ref={ref} className="w-full h-full">
      <React.Fragment>
        {(brandImageUrl) ? (
          <Image
            src={brandImageUrl}
            width={50}
            height={50}
            alt={title}
            className={cn(`h-full w-full rounded-full`, imageStyle,)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="text-muted-foreground/30" size={15} />
          </div >
        )}
      </React.Fragment>
    </div>
  );
};

export default BrandImage;