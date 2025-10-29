import React from 'react';
import { CommonParentProps } from '@/types/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "إدارة الفئات",
  description: "قم بإدارة جميع فئات المنتجات في RecoShop بسهولة. أضف، عدل أو احذف الفئات لضمان تنظيم متجر التجارة الإلكترونية الخاص بك بشكل أفضل.",
  keywords: ["RecoShop", "فئات المنتجات", "إدارة الفئات", "تجارة إلكترونية", "متجر سوري", "ملابس", "أجهزة طبية", "عناية شخصية", "إلكترونيات", "منتجات منزلية"],
  openGraph: {
    title: "إدارة الفئات - RecoShop",
    description: "قم بإدارة جميع فئات المنتجات في RecoShop بسهولة. أضف، عدل أو احذف الفئات لضمان تنظيم متجر التجارة الإلكترونية الخاص بك بشكل أفضل.",
    siteName: "RecoShop",
    locale: "ar_SY",
    type: "website",
  },
};

const CategoryLayout: React.FC<CommonParentProps> = ({ children }) => {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default CategoryLayout
