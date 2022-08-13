import React, {useEffect, useState, useContext} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import Article from "./article"
import Page404 from "./404";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="*" element={<Page404 />}/>
        <Route path="/goods" element={<Page404 />}/>
        <Route path="/:page" element={<Main />}/>
        <Route path="/article" element={<Page404 />}/>
        <Route path="/article/:_id" element={<Article />}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);
