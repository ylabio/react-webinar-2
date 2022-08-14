import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProductCard from '../components/product-card'

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='api/v1/articles/:id' element={<ProductCard />}/>
        </Routes>
        {modal === 'basket' && <Basket/>}
      </BrowserRouter>
      
    </>
  );
}

export default React.memo(App);
