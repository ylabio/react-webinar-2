import React, {useEffect, useState} from 'react';
import { Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import Product from './product';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/:page" element={<Main/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="*" element={<Main/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
