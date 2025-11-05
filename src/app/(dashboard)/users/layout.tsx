import React from 'react';
import { CommonParentProps } from '@/types/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "إدارة المستخدمين",
  description: "قم بإدارة مستخدمي RecoShop بما في ذلك المشرفين والزبائن. يمكنك عرض، تعديل، حذف أو ترقية مستخدم.",
  keywords: ["RecoShop", "إدارة المستخدمين", "مستخدمين", "مشرفين", "عملاء", "لوحة التحكم"],
  openGraph: {
    title: "إدارة المستخدمين - RecoShop",
    description: "قم بإدارة مستخدمي RecoShop بما في ذلك المشرفين والزبائن.",
    siteName: "RecoShop",
    locale: "ar_SY",
    type: "website",
  },
};

const UsersLayout: React.FC<CommonParentProps> = ({ children }) => {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default UsersLayout;
