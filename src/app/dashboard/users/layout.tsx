import React from 'react';
import { CommonParentProps } from '@/types/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "User Management",
  description: "Manage RecoShop users including administrators and customers. You can view, edit, delete, or promote a user.",
  keywords: ["RecoShop", "User Management", "Users", "Administrators", "Customers", "Dashboard"],
  openGraph: {
    title: "User Management - RecoShop",
    description: "Manage RecoShop users including administrators and customers.",
    siteName: "RecoShop",
    locale: "en_US",
    type: "website",
  },
};

const UsersLayout: React.FC<CommonParentProps> = ({ children }) => {
  return <>{children}</>;
};

export default UsersLayout;
