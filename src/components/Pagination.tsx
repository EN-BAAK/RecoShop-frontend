"use client"

import React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { PaginationProps } from "@/types/components"
import CustomButton from "./forms/Button"

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  isLoading = false,
}) => {

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const onNextPage = () => {
    if (currentPage < totalPages - 1) goToPage(currentPage + 1)
  }

  const onPreviousPage = () => {
    if (currentPage > 0) goToPage(currentPage - 1)
  }

  const generatePages = () => {
    const pages: (number | string)[] = []

    if (currentPage > 3) {
      pages.push("...")
    }

    const start = Math.max(0, currentPage - 2)
    const end = Math.min(totalPages - 1, currentPage + 2)

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
        className="w-fit rounded-sm"
        onClick={onPreviousPage}
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
            className="w-fit py-1 px-3 rounded-sm"
            variant={currentPage === (p as number + 1) ? "primary" : "primary-outline"}
            label={String((p as number) + 1)}
            onClick={() => goToPage(p as number)}
          />
        )
      )}

      <CustomButton
        icon={ArrowRight}
        className="w-fit rounded-sm"
        onClick={onNextPage}
        disabled={currentPage === totalPages || isLoading}
      />

    </div>
  )
}

export default Pagination
