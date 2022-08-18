import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import useSelector from '../utils/use-selector';
import Article from './article';
import NotFound from './not-found';

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
        <Route path="/" element={<Main />} />
        <Route path="/article">
          <Route path=":id" element={<Article />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
