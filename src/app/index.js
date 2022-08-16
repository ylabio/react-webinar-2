import React from 'react';
import {Route, Routes} from 'react-router-dom';
import useSelector from '../utils/use-selector';
import ArticleInfo from './article-info';
import Basket from './basket';
import Main from './main';

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
        <Route path='' element={<Main />} />
        <Route path='article/:id' element={<ArticleInfo />} />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
