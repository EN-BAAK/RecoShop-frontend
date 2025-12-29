import React from "react";
import type { Metadata } from "next";
import { metadata as mainMetadata } from "@/app/layout";
import { CommonParentProps } from "@/types/components";
import Header from "./Header";

const keywords = [
  ...(mainMetadata.keywords || []),
  "Bills",
  "Invoices",
  "Payments",
  "RecoShop",
];

export const metadata: Metadata = {
  title: "Bills | RecoShop",
  description: "View and manage your bills, invoices, and payment history on RecoShop.",
  keywords,
  openGraph: {
    title: "Bills | RecoShop",
    description: "View and manage your bills, invoices, and payment history on RecoShop.",
    siteName: "RecoShop",
    locale: "en_US",
    type: "website",
  },
};

const BillsLayout: React.FC<CommonParentProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default BillsLayout;
