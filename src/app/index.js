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
const language = navigator.language || navigator.userLanguage; //вытаскиеваем из браузера предустановленный язык

function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <Locale>
      <Router>
        <Routes>
          <Route path='/' element={<Main language={language.substr(0, 2)}/>}/>
          <Route path="/product/:id" element={<SingleProductPage language={language.substr(0, 2)}/>}/>
          <Route path="*" element={<h1>Такой страницы не существует</h1>}/>
        </Routes>
        {modal === 'basket' && <Basket/>}
      </Router>
    </Locale>
  );
}

export default React.memo(App);
