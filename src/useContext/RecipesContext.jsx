import { createContext, useState } from "react";

export const RecipesContext = createContext();

export const RecipesContextProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  return (
    <div>
      <RecipesContext.Provider value={{ recipes, setRecipes }}>
        {children}
      </RecipesContext.Provider>
    </div>
  );
};
