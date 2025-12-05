"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetProductsPaginatedByCategory } from "@/hooks/useProduct";
import { ShopProductSection } from "@/types/components";
import { ShopProduct } from "@/types/global";
import ProductCard from "./Product";
import LoadingPage from "@/components/LoadingPage";

const EmblaOptions = {
  align: "start",
  containScroll: "trimSnaps",
  breakpoints: {
    "(min-width: 640px)": { slidesToScroll: 2 },
    "(min-width: 1024px)": { slidesToScroll: 3 },
  },
} as Parameters<typeof useEmblaCarousel>[0];

export function Section({ category }: ShopProductSection) {
  const { data: productsData, isFetching, isError } = useGetProductsPaginatedByCategory({ limit: 10, page: 0, category: category, search: "", });
  const products = (productsData?.data || []) as ShopProduct[];

  const [emblaRef, emblaApi] = useEmblaCarousel(EmblaOptions);

  const scrollPrev = React.useCallback(() => {
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  if (isFetching) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <LoadingPage msg={`Loading ${category} products...`} />
      </div>
    );
  }

  if (isError || !products.length)
    return <React.Fragment />

  return (
    <section className="py-10 border-b border-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="font-heading font-bold text-3xl text-foreground">
            {category}
          </h2>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-2 select-none touch-pan-y">
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-0 pl-2 flex-[0_0_80%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}