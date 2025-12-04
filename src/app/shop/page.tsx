// /shop/page.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useGetProductsInfinite } from '@/hooks/useGetProductsInfinite';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import ProductCard from './Product';

const AVAILABLE_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Books',
  'Toys',
  'Beauty',
];

const ShopPage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useGetProductsInfinite({
      limit: 20,
      category: selectedCategories.length > 0 ? selectedCategories : undefined,
      search: debouncedSearch,
      offsetUnit: 'products',
    });

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: '300px', threshold: 0 }
    );

    const currentRef = loadMoreRef.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetching, fetchNextPage]);

  const allProducts = data?.pages.flatMap((page) => page.data.products) || [];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setDebouncedSearch('');
  };

  const hasActiveFilters = search || selectedCategories.length > 0;

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background dark:bg-slate-950 border-b border-muted dark:border-slate-800 py-6">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-3xl font-heading font-bold text-foreground dark:text-slate-100 mb-6">
            Shop
          </h1>

          {/* Filters */}
          <div className="space-y-4">
            {/* Search */}
            <div>
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border-muted dark:border-slate-700 text-foreground dark:text-slate-100"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="px-4 py-2 border border-muted dark:border-slate-700 rounded-lg text-foreground dark:text-slate-100 hover:bg-muted dark:hover:bg-slate-800 transition-colors"
                >
                  Categories {selectedCategories.length > 0 && `(${selectedCategories.length})`}
                </button>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="flex items-center gap-1"
                  >
                    <X size={16} />
                    Clear
                  </Button>
                )}
              </div>

              {/* Dropdown Menu */}
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-800 border border-muted dark:border-slate-700 rounded-lg shadow-lg p-3 space-y-2 z-50 min-w-56">
                  {AVAILABLE_CATEGORIES.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-muted dark:hover:bg-slate-700 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 rounded cursor-pointer"
                      />
                      <span className="text-foreground dark:text-slate-100 text-sm">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Active Category Badges */}
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <div
                    key={category}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-white rounded-full text-sm"
                  >
                    {category}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="hover:opacity-80 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div
        ref={containerRef}
        className="container mx-auto px-4 py-8 max-w-7xl"
      >
        {status === 'pending' && allProducts.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-accent dark:text-slate-400">Loading products...</p>
            </div>
          </div>
        ) : allProducts.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <p className="text-lg font-medium text-foreground dark:text-slate-100 mb-2">
                No products found
              </p>
              <p className="text-accent dark:text-slate-400">
                {hasActiveFilters
                  ? 'Try adjusting your filters'
                  : 'Check back soon for new items'}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
              {allProducts.map((product, index) => {
                // Every 7th or 8th product (alternating) spans 2 columns on large screens
                const isSpanProduct = (index + 1) % 8 === 0 || (index + 1) % 7 === 0;
                const spanClass =
                  isSpanProduct && index > 6
                    ? 'sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2'
                    : '';

                return (
                  <div key={product.id} className={spanClass}>
                    <ProductCard
                      product={product}
                      isLarge={isSpanProduct && index > 6}
                    />
                  </div>
                );
              })}
            </div>

            {/* Load More Trigger */}
            <div ref={loadMoreRef} className="h-10 mt-8" />

            {/* Loading State */}
            {isFetching && allProducts.length > 0 && (
              <div className="flex justify-center py-8">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
                </div>
              </div>
            )}

            {/* End of Products */}
            {!hasNextPage && allProducts.length > 0 && (
              <div className="text-center py-8">
                <p className="text-accent dark:text-slate-400">
                  You've reached the end of our collection
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShopPage;