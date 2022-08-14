import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom";
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
          <Route path="/" element={<Main/>} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
        {modal === 'basket' && <Basket/>}
      </HashRouter>
    </>
  );
}

export default React.memo(App);
