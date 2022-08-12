import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import Product from './product'
import ProductList from './productList'
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} >
            <Route index element={<ProductList/>}/>
          </Route>
          <Route path="/:id" element={<Product />} />

          {modal === "basket" && <Basket />}
        </Routes>
      </Router>
    </>
  );
}

export default React.memo(App);
