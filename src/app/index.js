import React, {useEffect, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Product from "./product";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <Routes>
      <Route 
        path='/' 
        element={
          <>
            <Main/>
            {modal === 'basket' && <Basket/>}
          </>
        } 
        exact
      />
      <Route 
        path='/product/:id' 
        element={
          <>
            <Product/>
            {modal === 'basket' && <Basket/>}
          </>
        } 
        exact
      />
    </Routes>
  );
}

export default React.memo(App);
