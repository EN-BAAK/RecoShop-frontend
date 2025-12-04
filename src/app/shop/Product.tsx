// /shop/product.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { ShopProduct } from '@/types/global';

interface ProductCardProps {
  product: ShopProduct;
  isLarge?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isLarge = false }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    // Add to cart logic
    console.log('Added to cart:', product.id);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (isLarge) {
    return (
      <div
        className="h-full bg-white dark:bg-slate-800 rounded-xl border border-muted dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary dark:hover:border-blue-500 flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full aspect-square bg-muted dark:bg-slate-700 overflow-hidden">
          {/* {product.imgURL ? (
            <Image
              src={product.imgURL}
              alt={product.title}
              fill
              className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'
                }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-accent dark:from-slate-700 dark:to-slate-600">
              <span className="text-accent dark:text-slate-400 text-center px-4">
                No image available
              </span>
            </div>
          )} */}

          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-800 rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <Heart
              size={20}
              className={`${isWishlisted
                  ? 'fill-danger text-danger'
                  : 'text-accent dark:text-slate-400'
                }`}
            />
          </button>

          {product.categories.length > 0 && (
            <div className="absolute bottom-4 left-4">
              <Badge variant="secondary" className="bg-primary text-white">
                {product.categories[0]}
              </Badge>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <p className="text-xs font-medium text-accent dark:text-slate-400 mb-2 uppercase tracking-wide">
            {product.brand}
          </p>

          <h3 className="font-heading font-bold text-lg text-foreground dark:text-slate-100 mb-2 line-clamp-2">
            {product.title}
          </h3>

          <p className="text-sm text-accent dark:text-slate-400 mb-4 line-clamp-3 flex-grow">
            {product.desc}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <p className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full mt-6 bg-primary hover:bg-blue-600 text-white font-medium flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-lg border border-muted dark:border-slate-700 overflow-hidden hover:shadow-md transition-all duration-300 hover:border-primary dark:hover:border-blue-500 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-muted dark:bg-slate-700 overflow-hidden">
        {/* {product.imgURL ? (
          <Image
            src={product.imgURL}
            alt={product.title}
            fill
            className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'
              }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-accent dark:from-slate-700 dark:to-slate-600">
            <span className="text-accent dark:text-slate-400 text-center px-2 text-xs">
              No image
            </span>
          </div>
        )} */}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-1.5 bg-white dark:bg-slate-800 rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            size={16}
            className={`${isWishlisted
                ? 'fill-danger text-danger'
                : 'text-accent dark:text-slate-400'
              }`}
          />
        </button>

        {/* Category Badge */}
        {product.categories.length > 0 && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="bg-primary text-white text-xs">
              {product.categories[0]}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs font-medium text-accent dark:text-slate-400 mb-1 uppercase tracking-widest">
          {product.brand}
        </p>

        <h3 className="font-heading font-bold text-sm text-foreground dark:text-slate-100 mb-2 line-clamp-2">
          {product.title}
        </h3>

        <p className="text-xs text-accent dark:text-slate-400 mb-3 line-clamp-2 flex-grow">
          {product.desc}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <p className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <Button
          onClick={handleAddToCart}
          size="sm"
          className="w-full mt-3 bg-primary hover:bg-blue-600 text-white text-xs"
        >
          <ShoppingCart size={14} className="mr-1" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;