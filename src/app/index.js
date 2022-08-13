import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import ArticlePage from "./article-page";
import useSelector from "../utils/use-selector";

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
        <Route path={""} element={<Main />} />
        <Route path={"/article/:id"} element={<ArticlePage />} />
      </Routes>
      {modal === "basket" && <Basket />}
    </>
  );
}

export default React.memo(App);
