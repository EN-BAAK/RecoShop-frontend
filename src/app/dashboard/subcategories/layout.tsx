import React from "react";
import { CommonParentProps } from "@/types/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subcategory Management",
  description:
    "Manage all subcategories in RecoShop easily. Add, edit, or delete subcategories to better organize your products professionally.",
  keywords: ["RecoShop", "subcategories", "subcategory management", "ecommerce", "clothes", "electronics", "home products", "personal care", "medical devices",],
  openGraph: {
    title: "Subcategory Management - RecoShop",
    description:
      "Manage all subcategories in RecoShop easily. Add, edit, or delete subcategories to better organize your products professionally.",
    siteName: "RecoShop",
    locale: "en_US",
    type: "website",
  },
};

const SubCategoryLayout: React.FC<CommonParentProps> = ({ children }) => {
  return <>{children}</>;
};

export default SubCategoryLayout;
