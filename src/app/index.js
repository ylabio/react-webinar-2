import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {Routes, Route } from 'react-router-dom';
import PropductPage from './product-page';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <>
    {modal === 'basket' && <Basket />}
    <Routes>
      <Route path='/' element={<Main />}/>
      <Route path="/articles/:id" element={<PropductPage />} />
    </Routes>
    </>
  );
}

export default React.memo(App);