"use client"

import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllCategories } from '@/hooks/useCategory';
import { Category } from '@/types/global';
import SectionHolder from './SectionHolder';
import { range } from '@/lib/helpers';
import Link from 'next/link';

const Categories: React.FC = () => {
  const { data, isFetching } = useGetAllCategories();
  const categories: Category[] = data?.data || [];

  if (!isFetching && !categories.length)
    return;

  return (
    <SectionHolder id='categories' title='Shop by Category' desc='Explore products by category and find exactly what you need'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isFetching ?
          <React.Fragment>
            {range(1, 6).map(i => (
              <Skeleton className='h-[200px] w-full' key={`category-${i}`} />
            ))} fb
          </React.Fragment>
          : <React.Fragment>
            {categories.map((category) => (
              <Link
                passHref
                key={`categories-${category.id}`}
                href={{
                  pathname: '/shop/products',
                  query: { category: category.title }
                }}
              >
                <Card
                  className="bg-background h-full border border-muted relative z-1 cursor-pointer overflow-hidden group transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="absolute top-2 right-6 w-16 h-16 border-t-2 border-r-2 border-muted-foreground rounded-full opacity-30 -z-1" />
                  <div className="absolute top-10 right-2 w-12 h-12 border-t-2 border-r-2 border-muted-foreground rounded-full opacity-20 -z-1" />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 border-l-2 border-b-2 border-muted-foreground rounded-full opacity-15 -z-1" />
                  <div className="absolute -bottom-8 right-20 w-20 h-20 border-t-2 border-l-2 border-muted-foreground rounded-full opacity-25 -z-1" />

                  <div className="h-full p-6 flex flex-col">

                    <div className="flex-1">
                      <h3 className="mb-2 font-heading font-bold text-lg text-foreground transition-colors duration-300 group-hover:text-primary">
                        {category.title}
                      </h3>
                      <p className="leading-relaxed text-sm text-foreground/60">
                        {category.desc}
                      </p>
                    </div>

                    <div className="bg-primary h-1 mt-4 rounded-full transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
                  </div>
                </Card></Link>
            ))}
          </React.Fragment>
        }
      </div>
    </SectionHolder>
  );
}

export default Categories