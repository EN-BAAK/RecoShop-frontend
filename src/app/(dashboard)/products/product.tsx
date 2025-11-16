"use client";

import { useRouter } from "next/navigation";
import { MoreVertical, Edit3, Trash2, Package } from "lucide-react";
import { useDeleteProduct } from "@/hooks/useProduct";
import { useAppContext } from "@/contexts/AppProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ProductProps } from "@/types/components";
import { Button } from "@/components/ui/button";
import { DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

const Product: React.FC<ProductProps> = ({ product }) => {
  const router = useRouter();
  const { showWarning } = useAppContext();
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleEdit = () => {
    router.push(`/products/edit/${product.id}`);
  };

  const handleDelete = () => {
    showWarning({
      message: `Are you sure you want to delete the product "${product.title}"? This action cannot be undone.`,
      btn1: "Cancel",
      btn2: "delete",
      handleBtn2: () => deleteProduct(product.id),
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "SYP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-background p-6 border border-muted rounded-xl shadow-sm relative font-sans transition-shadow duration-200 hover:shadow-md group">
      {product.imgURL ? (
        <div className="bg-muted h-48 mb-4 rounded-lg relative overflow-hidden">
          <Image
            loading="lazy"
            src={product.imgURL}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="bg-muted h-48 mb-4 rounded-lg flex items-center justify-center relative overflow-hidden">
          <Package className="w-16 h-16 text-muted-foreground/30" />
        </div>
      )}

      <div className="mb-4">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="mb-1 leading-tight line-clamp-2 font-sans font-semibold text-xl text-primary">
              {product.title}
            </h3>
            <p className="font-sans text-sm text-muted-foreground">
              {product.brand}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-transparent h-8 w-8 flex justify-center items-center rounded-full cursor-pointer transition duration-300 hover:bg-muted"
                aria-label="optoins"
                variant="ghost"
                size="icon"
              >
                <MoreVertical className="w-5 h-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="bg-background w-40 font-sans">
              <DropdownMenuLabel className="mb-1 px-1">Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1" />

              <DropdownMenuItem
                onClick={handleEdit}
                className="group flex items-center gap-2 font-sans text-orange-600 cursor-pointer transition duration-300 hover:text-background focus:bg-orange-600"
              >
                <Edit3 className="h-4 w-4 transition duration-300 group-hover:text-background" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                disabled={isPending}
                className="group flex items-center gap-2 font-sans text-danger cursor-pointer transition duration-300 hover:text-background disabled:opacity-50 focus:bg-danger/90"
              >
                <Trash2 className="h-4 w-4 transition duration-300 group-hover:text-background" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="mb-3 font-sans text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {product.desc}
        </p>

        <div className="pt-3 border-t border-muted">
          <span className="font-sans font-bold text-2xl text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* {product.categories && product.categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.categories.map((category: string, index: number) => (
              <span
                key={`${category}-${index}`}
                className="bg-primary/10 px-2.5 py-1 rounded-md font-sans font-medium text-xs text-primary"
              >
                {category}
              </span>
            ))}
          </div>
        )} */}
        <span
          className="bg-primary/10 px-2.5 py-1 rounded-md font-sans font-medium text-xs text-primary"
        >
          {/* {product.category} */}
        </span>

      </div>
    </div>
  );
};

export default Product;
