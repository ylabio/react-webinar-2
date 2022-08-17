import React, { useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import useStore from '../utils/use-store';
import useSelector from '../utils/use-selector';
import { Routes, Route } from 'react-router-dom';
import Article from './Article';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log('App');

  const modal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} exact />
        <Route path='article/:id' element={<Article />} />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
