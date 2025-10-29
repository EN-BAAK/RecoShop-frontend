import React from "react";
import type { Metadata } from "next";
import { metadata as mainMetadata } from "@/app/layout";
import { CommonParentProps } from "@/types/components";
import Sidebar from "./Sidebar";
import Header from "./Header";

const keywords = [...(mainMetadata.keywords || []), "لوحة التحكم", "إدارة", "التجارة الإلكترونية", "إدارة المنتجات", "إدارة المستخدمين"];

export const metadata: Metadata = {
  description: "لوحة تحكم المسؤول لإدارة المنتجات، المستخدمين، الفئات، والطلبات داخل RecoShop.",
  keywords,
  openGraph: {
    title: "لوحة التحكم | RecoShop",
    description: "لوحة تحكم المسؤول لإدارة المنتجات، المستخدمين، الفئات، والطلبات داخل RecoShop.",
    siteName: "RecoShop",
    locale: "ar_SY",
    type: "website",
  },
};

const DashboardLayout: React.FC<CommonParentProps> = ({ children }) => {
  return (
    <div className="bg-background h-screen max-h-screen flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 h-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
