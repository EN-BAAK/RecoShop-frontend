import React from "react";
import type { Metadata } from "next";
import { metadata as mainMetadata } from "@/app/layout";
import { CommonParentProps } from "@/types/components";
import Sidebar from "./Sidebar";
import Header from "./Header";

const keywords = [...(mainMetadata.keywords || []), "Dashboard", "Admin", "E-commerce", "Manage Products", "Manage Users"];

export const metadata: Metadata = {
  description: "Admin dashboard to manage products, users, categories, and orders inside RecoShop.",
  keywords,
  openGraph: {
    title: "Dashboard | RecoShop",
    description: "Admin dashboard to manage products, users, categories, and orders inside RecoShop.",
    siteName: "RecoShop",
    locale: "en_US",
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
