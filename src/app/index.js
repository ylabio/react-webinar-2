import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import SingleProductPage from './single-product-page';
import { Locale } from "../hoc/locale";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <Locale>
      <Router>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path="/product/:id" element={<SingleProductPage/>}/>
          <Route path="/*" element={<h1>Такой страницы не существует</h1>}/>
        </Routes>
        {modal === 'basket' && <Basket/>}
      </Router>
    </Locale>
  );
}

export default React.memo(App);
