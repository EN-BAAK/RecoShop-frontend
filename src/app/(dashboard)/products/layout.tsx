import React from 'react';
import { CommonParentProps } from '@/types/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Product Management",
  description:
    "Manage all RecoShop products with ease. Add new items, edit prices, or update images and details instantly.",
  keywords: ["RecoShop", "product management", "dashboard", "Syrian store", "ecommerce", "products", "add products", "edit products",],
  openGraph: {
    title: "Product Management - RecoShop",
    description:
      "Easily manage, add, and edit products in your RecoShop store.",
    siteName: "RecoShop",
    locale: "en_US",
    type: "website",
  },
};

const ProductsLayout: React.FC<CommonParentProps> = ({ children }) => {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default ProductsLayout;
