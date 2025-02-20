import { createContext, ReactNode, useContext, useState } from "react";

type FilterContextType = {
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  selectedGroup: string;
  setSelectedGroup: (group: string) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>("All");

  return (
    <FilterContext.Provider
      value={{
        selectedTag,
        setSelectedTag,
        selectedGroup,
        setSelectedGroup,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterPRovider");
  }
  return context;
}
