import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import useSelector from '../utils/use-selector';
import ArticlePage from '../components/article-page';
import PageNotFound from '../components/page-not-found';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path="article/:id" element={<ArticlePage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
