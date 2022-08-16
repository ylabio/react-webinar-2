import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Product_page from '../components/product_page';
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
      <Route path="/" element={<Main/>}/>
      <Route path="/articles/:id" element={<Product_page/>}/>
    </Routes>
     
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
