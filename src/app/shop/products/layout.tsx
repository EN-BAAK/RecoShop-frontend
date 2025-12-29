import React from "react";
import { CommonParentProps } from "@/types/components";
import { Metadata } from "next";
import { metadata as mainMetadata } from "../layout"

const keywords = [...(mainMetadata.keywords || []), "Surf Products", "Surf Gear", "Surf Shop", "Surfboards", "Wetsuits", "Surf Accessories", "Buy Surf Equipment", "RecoShop",];

export const metadata: Metadata = {
  title: "Surf Products | RecoShop",
  description:
    "Explore all surf products at RecoShop. Shop surfboards, wetsuits, and premium surf gear in one place.",
  keywords,
  openGraph: {
    title: "Surf Products | RecoShop",
    description:
      "Discover the full collection of surf products at RecoShop, including surfboards, wetsuits, and essential surf gear.",
    siteName: "RecoShop",
    locale: "en_US",
    type: "website",
  },
};

const ProductsLayout: React.FC<CommonParentProps> = ({ children }) => {
  return (
    <div className="px-4 py-6 md:px-6">
      {children}
    </div>
  )
}

export default ProductsLayout