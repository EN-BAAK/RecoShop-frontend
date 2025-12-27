import React from "react";
import type { Metadata } from "next";
import { metadata as mainMetadata } from "@/app/layout";
import { CommonParentProps } from "@/types/components";
import Header from "./Header";
import Footer from "./Footer";
import ShopProvider from "@/contexts/ShopProvider";
import Sidebar from "./Sidebar";

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
    <div className="bg-background h-screen flex relative overflow-hidden">
      <ShopProvider>

        <main className="w-full flex">
          <div className="w-full h-full md:w-100 flex-1 flex flex-col overflow-y-auto">
            <Header />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </div>

          <Sidebar />
        </main>

      </ShopProvider>
    </div>
  );
};

export default ShopLayout;
