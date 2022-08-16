import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import Article from "./article";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  // console.log('App');

  const modal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {modal === "basket" && <Basket />}
    </>
  );
}

export default React.memo(App);
