import React from 'react';
import { CommonParentProps } from '@/types/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "إدارة المنتجات",
  description: "قم بإدارة جميع منتجات متجر RecoShop بضغطة زر. أضف منتجات جديدة، عدل الأسعار، أو حدّث الصور والتفاصيل بسهولة.",
  keywords: ["RecoShop", "إدارة المنتجات", "لوحة التحكم", "متجر سوري", "تجارة إلكترونية", "منتجات", "إضافة منتجات", "تعديل منتجات"],
  openGraph: {
    title: "إدارة المنتجات - RecoShop",
    description: "يمكنك إدارة وإضافة وتعديل المنتجات في متجر RecoShop بكل سهولة.",
    siteName: "RecoShop",
    locale: "ar_SY",
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
