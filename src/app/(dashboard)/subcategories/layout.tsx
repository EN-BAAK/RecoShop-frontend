import React from 'react';
import { CommonParentProps } from '@/types/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "إدارة التصنيفات الفرعية",
  description:
    "قم بإدارة جميع التصنيفات الفرعية في RecoShop بسهولة. أضف، عدل أو احذف التصنيفات الفرعية لتنظيم منتجاتك بشكل أكثر دقة واحترافية.",
  keywords: ["RecoShop", "تصنيفات فرعية", "إدارة التصنيفات الفرعية", "تجارة إلكترونية", "متجر سوري", "ملابس", "إلكترونيات", "منتجات منزلية", "عناية شخصية", "أجهزة طبية",],
  openGraph: {
    title: "إدارة التصنيفات الفرعية - RecoShop",
    description:
      "قم بإدارة جميع التصنيفات الفرعية في RecoShop بسهولة. أضف، عدل أو احذف التصنيفات الفرعية لتنظيم منتجاتك بشكل أكثر دقة واحترافية.",
    siteName: "RecoShop",
    locale: "ar_SY",
    type: "website",
  },
};

const SubCategoryLayout: React.FC<CommonParentProps> = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export default SubCategoryLayout;
