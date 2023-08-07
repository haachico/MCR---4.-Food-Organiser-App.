import Home from "./Pages/Home";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
import DetailsPage from "./Pages/DetailsPage";

import Header from "./Components/Header";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="recipe/:id" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}
