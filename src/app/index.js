import React from "react";
import Main from "./main";
import Article from "./article";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { Routes, Route, useLocation } from "react-router-dom";
/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log("App");

  const modal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/articles/:id" element={<Article />} />
      </Routes>

      {modal === "basket" && <Basket />}
    </>
  );
}

export default React.memo(App);
