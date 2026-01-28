"use client"

import React from 'react'
import ProductImage from '@/components/ProductImage'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetMostPurchasedProduct } from '@/hooks/useProduct'
import { PackageX, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { range } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const HeroProductCard: React.FC = () => {
  const router = useRouter()
  const { data, isFetching } = useGetMostPurchasedProduct()
  const product = data?.data

  const navigateToProduct = () => {
    router.push(`/shop/products/${product.id}`)
  }

  return (
    <React.Fragment>
      {isFetching
        ? <React.Fragment>
          <Skeleton className="h-[80%] rounded mb-1" />
          <Skeleton className="h-2 w-2/3 rounded" />
        </React.Fragment>
        : !product
          ? <div
            className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground"
            onClick={navigateToProduct}
          >
            <PackageX className="w-10 h-10" />
            <p className="font-medium text-sm text-center">
              No product data available
            </p>
          </div>
          : <div className='relative z-10 cursor-pointer' onClick={navigateToProduct}>
            <div className="absolute -top-1 left-0 z-10">
              <div className="flex gap-1">
                {range(1, 5).map((star) => (
                  <Star
                    key={`star-${star}`}
                    size={12}
                    className={cn(
                      "transition-colors",
                      star <= product.rate.average
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-yellow-500"
                    )}
                  />
                ))}
              </div>
            </div>

            <ProductImage id={product.id} title={product.title} />
            <p className='text-sm'>{product.title}</p>
          </div>}
    </React.Fragment>
  )
}

export default HeroProductCard