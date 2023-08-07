import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  RecipesContext,
  RecipesContextProvider
} from "./useContext/RecipesContext";

import App from "./App";

export { RecipesContext };

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <RecipesContextProvider>
        <App />
      </RecipesContextProvider>
    </BrowserRouter>
  </StrictMode>
);
