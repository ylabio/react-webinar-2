import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import Product from "./product";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/product/:id" element={<Product/>} />
      </Routes>
      {modal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);
