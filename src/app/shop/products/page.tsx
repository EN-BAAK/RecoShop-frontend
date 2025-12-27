"use client"

import { useGetProductsPaginatedByCategory } from "@/hooks/useProduct"
import { ShopProduct } from "@/types/global"
import React from "react"
import Pagination from "@/components/Pagination"
import ProductCard from "../Product"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import ErrorPage from "@/components/ErrorPage"
import { range } from "@/lib/helpers"
import { Skeleton } from "@/components/ui/skeleton"
import EmptyElement from "@/components/EmptyElement"
import { useShopContext } from "@/contexts/ShopProvider"

const CategoryPage: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { search } = useShopContext()

  const categoryParam = searchParams.get("category")
  const pageParam = searchParams.get("page")

  const category = categoryParam ? decodeURIComponent(String(categoryParam)) : ""
  const page = pageParam ? parseInt(pageParam) : 1

  const { data: productsData, isFetching, isError, error, refetch } = useGetProductsPaginatedByCategory({ limit: 6, page, category: category, search })

  const products: ShopProduct[] = productsData?.data.products || []
  const totalPages = productsData?.data.totalPages || 1

  const handleNavigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(page))

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="space-y-8">
      {category && <div className="pb-6 border-b border-muted">
        <h1 className="capitalize font-heading font-bold text-xl md:text-3xl text-primary">
          {category}
        </h1>
      </div>}

      {isError ? (
        <ErrorPage
          msg={error.message}
          action={refetch}
        />
      )
        : isFetching ? (
          <div className="space-y-4">
            {range(0, 6).map((_, i) => (
              <Skeleton key={i} className="h-48 bg-muted rounded-lg" />
            ))}
          </div>
        )
          : products.length <= 0 ?
            <EmptyElement desc="No products found in this category" title="There is no products" />
            : <React.Fragment>
              <div className="space-y-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} dir="horizontal" />
                ))}
              </div>

              <div className="mt-8 pt-6 flex justify-center border-t border-muted">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  handleSetCurrentPageFunc={handleNavigateToPage}
                  isLoading={isFetching}
                />
              </div>
            </React.Fragment>
      }
    </div>
  )
}

export default CategoryPage