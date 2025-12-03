import React from "react";
import { CommonParentProps } from "@/types/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Management",
  description:
    "Manage all product brands in RecoShop. Add new brands, upload brand logos, or edit existing ones effortlessly.",
  keywords: ["RecoShop", "brand management", "dashboard", "brands", "edit brands", "create brand", "Syrian store", "ecommerce",],
  openGraph: {
    title: "Brand Management - RecoShop",
    description:
      "Add, edit, or manage product brands and logos in your RecoShop dashboard.",
    siteName: "RecoShop",
    locale: "en_US",
    type: "website",
  },
};

const BrandsLayout: React.FC<CommonParentProps> = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export default BrandsLayout;
