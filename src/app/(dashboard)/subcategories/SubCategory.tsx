"use client";

import { useRouter } from "next/navigation";
import { MoreVertical, Edit3, Trash2, Tag } from "lucide-react";
import { useDeleteSubCategory } from "@/hooks/useSubCategory";
import { useAppContext } from "@/contexts/AppProvider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SubCategoryProps } from "@/types/components";
import { Button } from "@/components/ui/button";
import { DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

const SubCategory: React.FC<SubCategoryProps> = ({ subCategory }) => {
  const router = useRouter();
  const { showWarning } = useAppContext();
  const { mutate: deleteSubCategory, isPending: isDeleting } = useDeleteSubCategory();

  const handleEdit = () => {
    router.push(`/subcategories/edit/${subCategory.id}`);
  };

  const handleDelete = () => {
    showWarning({
      message: "Are you sure you want to delete this subcategory?",
      btn1: "Cancel",
      btn2: "Delete",
      handleBtn2: () => deleteSubCategory(subCategory.id),
    });
  };

  return (
    <div className="bg-background p-6 border border-muted rounded-xl shadow-sm relative group transition-shadow duration-200 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-lg">
            <Tag className="w-5 h-5 text-primary" />
          </div>

          <h3 className="text-lg font-bold font-sans text-foreground leading-tight line-clamp-2">
            {subCategory.title}
          </h3>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-transparent h-8 w-8 flex justify-center items-center rounded-full cursor-pointer transition duration-300 hover:bg-muted"
              aria-label="Options"
              variant="ghost"
              size="icon"
            >
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
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
              disabled={isDeleting}
              className="group flex items-center gap-2 font-sans text-danger cursor-pointer transition duration-300 hover:text-background disabled:opacity-50 focus:bg-danger/90"
            >
              <Trash2 className="h-4 w-4 transition duration-300 group-hover:text-background" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-3">
        {subCategory.desc && (
          <p className="leading-relaxed line-clamp-3 font-sans text-sm text-muted-foreground">
            {subCategory.desc}
          </p>
        )}

        <div className="pt-3 border-t border-muted">
          <span className="bg-primary/10 py-1 px-2.5 rounded-md font-sans font-semibold text-xs text-primary">
            {subCategory.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
