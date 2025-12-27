"use client"

import React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { PaginationProps } from "@/types/components"
import CustomButton from "./forms/Button"

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handleSetCurrentPageFunc,
  isLoading = false,
}) => {

  const goToPage = (page: number) => {
    handleSetCurrentPageFunc(page)
  }

  const onGoToLastPage = () => {
    if (currentPage < totalPages ) goToPage(totalPages)
  }

  const onGoToFirstPage = () => {
    if (currentPage > 1) goToPage(1)
  }

  const generatePages = () => {
    const pages: (number | string)[] = []

    if (currentPage > 3) {
      pages.push("...")
    }

    const start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, currentPage + 2)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 4) {
      pages.push("...")
    }
    return pages
  }

  const pages = generatePages()

  return (
    <div className="flex justify-center items-center flex-wrap gap-3">

      <CustomButton
        icon={ArrowLeft}
        className="w-fit h-8 rounded-sm"
        onClick={onGoToFirstPage}
        disabled={currentPage === 1 || isLoading}
      />

      {pages.map((p, idx) =>
        p === "..." ? (
          <span
            key={idx}
            className="px-2 text-foreground/50 select-none"
          >
            ...
          </span>
        ) : (
          <CustomButton
            key={idx}
            disabled={isLoading}
            className="w-8 h-8 rounded-sm"
            variant={currentPage === (p as number) ? "primary" : "primary-outline"}
            label={String((p as number))}
            onClick={() => goToPage(p as number)}
          />
        )
      )}

      <CustomButton
        icon={ArrowRight}
        className="w-fit h-8 rounded-sm"
        onClick={onGoToLastPage}
        disabled={(currentPage === totalPages) || isLoading}
      />

    </div>
  )
}

export default Pagination
