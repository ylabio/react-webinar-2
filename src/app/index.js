import React, { useEffect, useState } from "react";
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import ArticlePage from "./article-page";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log("App");

  const modal = useSelector((state) => state.modals.name);

  return (
    <>
      <Router>
        <Routes>
          <Route path="catalog" element={<Main />} />
          <Route path="catalog/:id" element={<ArticlePage />} />
          <Route path="*" element={<Navigate to="/catalog" replace />} />
        </Routes>
        {modal === "basket" && <Basket />}
      </Router>
    </>
  );
}

export default React.memo(App);
