import React from "react";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import ProductPage from "./product-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log("App");

  const modal = useSelector((state) => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/article/:id" element={<ProductPage />} />
      </Routes>
      {modal === "basket" && <Basket />}
    </BrowserRouter>
  );
}

export default React.memo(App);
