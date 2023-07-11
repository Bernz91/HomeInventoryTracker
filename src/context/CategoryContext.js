import React, { useContext, useState } from "react";

// create context
const CategoryContext = React.createContext();

// provide context
function CategoryContextProvider({ children }) {
  const [categories, setCategories] = useState();
  const value = { categories, setCategories };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

// use context
function useCategoryContext() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error(
      "useCategoryContext must be used within CategoryContextProvider"
    );
  }
  return context;
}

export { CategoryContextProvider, useCategoryContext };
