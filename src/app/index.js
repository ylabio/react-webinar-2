import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Product from './product';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";

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
        <Route path='/' element={<Main/>}/>
        <Route path=':id' element={<Product/>}/>
      </Routes>
      
      {modal === 'basket' && <Basket/>}
    </Router>
  );
}

export default React.memo(App);
