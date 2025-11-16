import React from 'react';
import { CommonParentProps } from '@/types/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Manage Categories",
  description: "Manage all product categories in RecoShop easily. Add, edit, or delete categories to keep your e-commerce store organized.",
  keywords: ["RecoShop", "Product Categories", "Manage Categories", "E-commerce", "Clothing", "Electronics", "Medical Devices", "Personal Care", "Home Products"],
  openGraph: {
    title: "Manage Categories - RecoShop",
    description: "Manage all product categories in RecoShop easily. Add, edit, or delete categories to keep your e-commerce store organized.",
    siteName: "RecoShop",
    locale: "en_US",
    type: "website",
  },
};

const CategoryLayout: React.FC<CommonParentProps> = ({ children }) => {
  return <>{children}</>;
};

export default CategoryLayout;
