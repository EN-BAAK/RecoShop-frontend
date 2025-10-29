"use client";

import React from "react";
import { CategoryProps } from "@/types/components";
import { useDeleteCategory } from "@/hooks/useCategory";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/AppProvider";
import { Edit3, Trash2, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Category: React.FC<CategoryProps> = ({ category }) => {
  const router = useRouter();
  const { showWarning } = useAppContext();
  const { mutateAsync: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  const handleEdit = () => {
    router.push(`/categories/edit/${category.id}`);
  };

  const handleDelete = () => {
    showWarning({
      message: "هل انت متاكد انك تريد حذف هذه الفئة؟",
      btn1: "الغاء",
      btn2: "حذف",
      handleBtn2: () => deleteCategory(category.id),
    });
  };

  return (
    <div className="bg-background p-6 border border-muted rounded-xl shadow-sm font-sans relative transition-shadow duration-200 hover:shadow-md">
      <div className="mb-4">
        <div className="mb-3 flex justify-between items-start">
          <h3 className="leading-tight font-sans font-semibold text-xl text-primary">
            {category.title}
          </h3>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="bg-transparent h-8 w-8 flex justify-center items-center rounded-full cursor-pointer transition duration-300 hover:bg-muted"
                aria-label="خيارات"
              >
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="bg-background w-40 font-sans">
              <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleEdit}
                className="group flex items-center gap-2 font-sans text-orange-600 cursor-pointer transition duration-300 hover:text-background focus:bg-orange-600"
              >
                <Edit3 className="h-4 w-4 transition duration-300 group-hover:text-background" />
                <span>تعديل</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleDelete}
                disabled={isDeleting}
                className="group flex items-center gap-2 font-sans text-danger cursor-pointer transition duration-300 hover:text-background disabled:opacity-50 focus:bg-danger/90"
              >
                <Trash2 className="h-4 w-4 transition duration-300 group-hover:text-background" />
                <span>حذف</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="line-clamp-3 leading-relaxed font-sans text-sm text-muted-foreground">
          {category.desc}
        </p>
      </div>
    </div>
  );
};

export default Category;
