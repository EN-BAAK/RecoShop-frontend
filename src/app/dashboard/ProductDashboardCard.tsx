'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductDashboardCardProps } from '@/types/components'
import React from 'react'
import ProductImage from '@/components/ProductImage'
import { useRouter } from 'next/navigation'

const ProductDashboardCard: React.FC<ProductDashboardCardProps> = ({ product }) => {
  const router = useRouter()

  const navigateToProductOnShop = () => {
    router.push(`/shop/products/${product.id}`)
  }

  return (
    <Card
      onClick={navigateToProductOnShop}
      className="h-[300px] p-6 relative col-span-1 md:col-span-2 xl:col-span-1 cursor-pointer transition-shadow duration-300 hover:shadow-lg">
      <div className="h-full flex xl:flex-col gap-4">
        <div className="w-45 xl:w-full h-full xl:h-45">
          <ProductImage title={product.title} id={product.id} />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h3 title={product.title} className="mb-2 truncate font-semibold text-foreground">
              {product.title}
            </h3>

            <span className='xl:hidden text-muted-foreground'>{product.desc}</span>

            <p className="mb-3 font-bold text-2xl text-primary">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <Badge
            variant={'destructive'}
            className="bg-primary absolute right-5 bottom-5 z-1 text-background"
          >
            +{product.totalQuantity}
          </Badge>
        </div>
      </div>
    </Card>
  )
}

export default ProductDashboardCard