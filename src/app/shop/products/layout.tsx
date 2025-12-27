import React from "react";
import { CommonParentProps } from "@/types/components";

const ProductsLayout: React.FC<CommonParentProps> = ({ children }) => {
  return (
    <div className="px-4 py-6 md:px-6">
      {children}
    </div>
  )
}

export default ProductsLayout