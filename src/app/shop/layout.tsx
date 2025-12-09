import React from "react";
import type { Metadata } from "next";
import { metadata as mainMetadata } from "@/app/layout";
import { CommonParentProps } from "@/types/components";
import Header from "./Header";
import Footer from "./Footer";
import ShopProvider from "@/contexts/ShopProvider";

const keywords = [...(mainMetadata.keywords || []), "Shop", "Products", "Buy", "E-commerce", "RecoShop"];

export const metadata: Metadata = {
  description: "Shop layout to browse and buy products from RecoShop.",
  keywords,
  openGraph: {
    title: "Shop | RecoShop",
    description: "Browse and purchase products from RecoShop.",
    siteName: "RecoShop",
    locale: "en_US",
    type: "website",
  },
};

const ShopLayout: React.FC<CommonParentProps> = ({ children }) => {
  return (
    <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">
      <ShopProvider>
        <Header />

        <main className="w-full flex-1 flex flex-col">
          {children}
        </main>

        <Footer />
      </ShopProvider>
    </div>
  );
};

export default ShopLayout;
