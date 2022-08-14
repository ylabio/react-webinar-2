import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ItemPage from './itemPage';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  const renderMainElement = <>
  <Main />
  {modal === 'basket' && <Basket/>}
  </>;
  const renderItemElement = <>
  <ItemPage />
  {modal === 'basket' && <Basket/>}
  </>;

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={renderMainElement} />
      <Route path='/item' element={renderItemElement} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default React.memo(App);
