"use client";

import React, { createContext, useContext, useState } from "react";
import { ShopContextProps } from "@/types/context";
import { CommonParentProps } from "@/types/components";

const ShopContext = createContext<ShopContextProps | undefined>(undefined);

export const ShopProvider = ({ children }: CommonParentProps): React.JSX.Element => {
  const [search, setSearch] = useState<string>("")

  return (
    <ShopContext.Provider
      value={{
        search,
        setSearch
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => {
  const CONTEXT = useContext(ShopContext);
  return CONTEXT as ShopContextProps;
};

export default ShopProvider;
