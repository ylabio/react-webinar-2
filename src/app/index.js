import React from "react";
import {HashRouter, Routes, Route, Navigate} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import Article from "./article";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/catalog/:page" element={<Main />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/" element={<Navigate replace to="/catalog/1"/>} />
        </Routes>
        {modal === 'basket' && <Basket />}
      </HashRouter>
    </>
  );
}

export default React.memo(App);
