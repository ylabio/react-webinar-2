import React, { useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import useSelector from '../utils/use-selector';
import { Routes, Route } from 'react-router-dom';
import ItemInfo from './itemInfo';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/:id' element={<ItemInfo />} />
      </Routes>

      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
