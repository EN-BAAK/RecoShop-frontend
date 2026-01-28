'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { PackageX, Star } from 'lucide-react'
import ProductImage from '@/components/ProductImage'
import { useRouter } from 'next/navigation'
import { useGetMostPurchasedProduct } from '@/hooks/useProduct'
import { range } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const ProductDashboardCard: React.FC = () => {
  const { data, isFetching, isError } = useGetMostPurchasedProduct()
  const product = data?.data
  const router = useRouter()

  const navigateToProductOnShop = () => {
    if (!product) return
    router.push(`/shop/products/${product.id}`)
  }

  return (
    <Card
      onClick={!isFetching && !isError && product ? navigateToProductOnShop : undefined}
      className="sm:h-[300px] p-6 relative col-span-1 md:col-span-2 xl:col-span-1 transition-shadow duration-300 hover:shadow-lg cursor-pointer"
    >
      {isFetching ? (
        <div className="h-full flex xl:flex-col gap-4">
          <Skeleton className="w-45 xl:w-full h-full xl:h-45 rounded-md" />

          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div className="space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full xl:hidden" />
              <Skeleton className="h-6 w-1/2" />
            </div>

            <Skeleton className="h-6 w-16 self-end" />
          </div>
        </div>
      ) : (isError || !product)
        ? <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <PackageX className="w-10 h-10" />
          <p className="font-medium text-sm text-center">
            No product data available
          </p>
        </div>
        : <div className="h-full flex gap-4 xl:flex-col sm:flex-row flex-col">
          <div className="w-full sm:w-45 h-full xl:w-full xl:h-45 relative">
            <div className="px-2 py-1 hidden xl:block rounded-md absolute top-1 left-1 z-10">
              <div className="flex gap-1">
                {range(1, 5).map((star) => (
                  <Star
                    key={`star-${star}`}
                    size={16}
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

            <ProductImage title={product.title} id={product.id} />
          </div>

          <div className="relative w-full md:w-1/2 xl:w-full flex flex-col justify-between">
            <div className="space-y-2">
              <h3
                title={product.title}
                className="truncate font-semibold text-foreground"
              >
                {product.title}
              </h3>

              <p className="text-muted-foreground text-sm xl:hidden">
                {product.desc}
              </p>

              <div className="block xl:hidden sm:block space-y-1 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Brand:</span>{" "}
                  {product.brand}
                </p>
                <p>
                  <span className="font-medium text-foreground">Category:</span>{" "}
                  {product.category}
                </p>
                {product.subCategories?.[0] && (
                  <p>
                    <span className="font-medium text-foreground">Sub:</span>{" "}
                    {product.subCategories[0].title}
                  </p>
                )}
              </div>

              <p className="font-bold text-2xl text-primary">
                ${product.price}
              </p>
            </div>
          </div>
        </div>

      }
    </Card>
  )
}

export default ProductDashboardCard
