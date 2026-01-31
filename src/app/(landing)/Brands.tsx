'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useGetAllBrands } from '@/hooks/useBrand';
import { Brand } from '@/types/global';
import SectionHolder from './SectionHolder';
import BrandImage from '@/components/BrandImage';
import { Skeleton } from '@/components/ui/skeleton';

const EmblaOptions = {
  align: 'start',
  containScroll: 'trimSnaps',
} as Parameters<typeof useEmblaCarousel>[0];

const Brands: React.FC = () => {
  const { data, isFetching } = useGetAllBrands();
  const brands: Brand[] = data?.data || [];

  const [emblaRef] = useEmblaCarousel(EmblaOptions);

  if (!isFetching && !brands.length) return null;

  return (
    <SectionHolder
      id='brands'
      title="Shop by Brand"
      desc="Discover products from the world's most trusted brands"
      sectionStyle="bg-gradient-to-b from-background via-primary/35 to-background/20"
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-6 select-none touch-pan-y">

          {isFetching ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={`brand-skeleton-${i}`}
                className="bg-background/60 h-[140px] flex-[0_0_120px] rounded-xl"
              />
            ))
          ) : (
            brands.map((brand) => (
              <div
                key={brand.id}
                className="flex-[0_0_120px] sm:flex-[0_0_140px]"
              >
                <div className="h-full rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1">

                  <div className="w-15 h-15 mb-1 rounded-full overflow-hidden">
                    <BrandImage title={brand.name} />
                  </div>

                  <p className="text-center font-semibold text-sm text-foreground transition-colors duration-300 group-hover:text-primary">
                    {brand.name}
                  </p>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </SectionHolder>
  );
};

export default Brands;
