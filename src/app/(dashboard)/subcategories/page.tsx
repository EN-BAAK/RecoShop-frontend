"use client";

import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { useGetAllSubCategories } from "@/hooks/useSubCategory";
import { SubCategoryGlobal } from "@/types/global";
import PageHolder from "@/app/PageHolder";
import Link from "next/link";
import CustomButton from "@/components/forms/Button";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";
import EmptyElement from "@/components/EmptyElement";
import SubCategory from "./SubCategory";

const SubCategoriesPage: React.FC = () => {
  const router = useRouter();
  const { data, isFetching, isError, error, refetch } = useGetAllSubCategories();

  const subcategories = data?.data || []

  const handleAddNew = () => {
    router.push("/subcategories/add");
  };

  return (
    <PageHolder
      title="إدارة التصنيفات الفرعية"
      desc="قم بإدارة التصنيفات الفرعية لتنظيم منتجاتك بشكل أدق داخل التصنيفات الرئيسية."
      outerElement={
        <Link href="/subcategories/add" passHref>
          <CustomButton
            label='إضافة فئة فرعية جديدة'
            className="w-fit rounded-full absolute bottom-8 left-8 z-50"
            icon={PlusCircle}
          />
        </Link>
      }
    >
      {
        isFetching
          ? <LoadingPage />
          : isError
            ? <ErrorPage action={refetch} msg={error.message} />
            : subcategories.length === 0
              ? <EmptyElement
                title="لا توجد تصنيفات فرعية"
                desc="ابدأ بإضافة تصنيف فرعي جديد لتنظيم منتجاتك بشكل أفضل داخل التصنيفات الرئيسية"
                button={{
                  action: handleAddNew,
                  msg: "اضافة فئة فرعية جديدة"
                }} />
              : <div className="overflow-y-auto">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {subcategories.map((subcategory: SubCategoryGlobal) => (
                    <SubCategory key={subcategory.id} subCategory={subcategory} />
                  ))}
                </div>
              </div>
      }
    </PageHolder>
  );
};

export default SubCategoriesPage;