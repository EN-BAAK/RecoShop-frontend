"use client";

import React, { createContext, useContext, } from "react";
import { CommonParentProps } from "@/types/components";
import { FilteringContextProps } from "@/types/context";

const FilteringContext = createContext<FilteringContextProps | undefined>(undefined);

export const FilteringProvider = ({ children }: CommonParentProps): React.JSX.Element => {
  const [search, setSearch] = React.useState<string>("");

  return (
    <FilteringContext.Provider
      value={{
        search,
        setSearch
      }}
    >
      {children}
    </FilteringContext.Provider>
  );
};

export const useFilteringContext = () => {
  const CONTEXT = useContext(FilteringContext);
  return CONTEXT as FilteringContextProps;
};

export default FilteringProvider;
