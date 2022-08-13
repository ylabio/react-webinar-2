import React, { useEffect, useState } from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { Routes, Route } from 'react-router-dom';
import ProductsPage from './../pages/products-page/products-page';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="product/:_id" element={<ProductsPage />} />
        </Routes>
        {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
