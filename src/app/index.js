import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import ProductCard from "./product-card";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <Router>
      <Routes>
        <Route path="/">
          <Main/>
        </Route>
        <Route path="/card">
          <ProductCard/>
        </Route>
      </Routes>
    </Router>
  );
}

export default React.memo(App);

// {modal === 'basket' && <Basket/>}