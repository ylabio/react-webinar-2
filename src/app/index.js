import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Page from "./pages";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";

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
        <Route path="/:id" element={<Page />} />
      </Routes>
      {modal === "basket" && <Basket />}
    </BrowserRouter>
  );
}

export default React.memo(App);
