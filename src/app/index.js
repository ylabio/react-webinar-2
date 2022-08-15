import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector"; 
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ItemPage from '../pages/item-page';
import NotFound from '../pages/not-found';
/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Main/>}/>
        <Route path = 'product/:id' element = {<ItemPage/>}/>
        <Route path = {'*'} element = {<NotFound/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);
