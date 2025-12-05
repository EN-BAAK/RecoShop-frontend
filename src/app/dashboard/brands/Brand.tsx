"use client";

import { useRouter } from "next/navigation";
import { MoreVertical, Edit3, Trash2 } from "lucide-react";
import { useDeleteBrand } from "@/hooks/useBrand";
import { useAppContext } from "@/contexts/AppProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { BrandProps } from "@/types/components";
import BrandImage from "./BrandImage";
import { Button } from "@/components/ui/button";
import { DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

const Brand: React.FC<BrandProps> = ({ brand }) => {
  const router = useRouter();
  const { showWarning } = useAppContext();
  const { mutate: deleteBrand, isPending } = useDeleteBrand();

  const handleEdit = () => {
    router.push(`brands/edit/${brand.id}`);
  };

  const handleDelete = () => {
    showWarning({
      message: `Are you sure you want to delete the brand "${brand.name}"? This action cannot be undone.`,
      btn1: "Cancel",
      btn2: "Delete",
      handleBtn2: () => {
        deleteBrand(brand.id);
      },
    });
  };

  return (
    <div className="p-2 flex flex-col justify-center items-center font-sans font-normal text-base text-primary relative">
      <div className="p-1 w-22 h-22 flex justify-center items-center">
        <BrandImage id={brand.id} title={brand.name} />
      </div>

      <h3 className="flex-1 line-clamp-2 leading-tight text-center font-sans font-semibold text-xl text-primary">
        {brand.name}
      </h3>

      <div className="absolute top-1 right-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-transparent h-8 w-8 flex justify-center items-center rounded-full cursor-pointer transition duration-300 hover:bg-muted"
              aria-label="Options"
              variant="ghost"
              disabled={isPending}
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
    </div>
  );
};

export default Brand;
