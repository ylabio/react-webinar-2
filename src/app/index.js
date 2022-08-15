import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import ItemPage from './item-page';
import { Routes, Route } from 'react-router-dom';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Main />
          {modal === 'basket' && <Basket />}
        </>
      } />
      <Route path="/item/:_id" element={
        <>
          <ItemPage />
          {modal === 'basket' && <Basket />}
        </>
      } />
    </Routes>
  );
}

export default React.memo(App);
