import React from 'react';
import Main from './main';
import Basket from './basket';
import useSelector from '../utils/hooks/use-selector';
import multiLang from '../multiLang';
import {LangContext} from '../multiLang/langContext';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Article from './arcticle';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  // console.log('App');

  const modal = useSelector((state) => state.modals.name);
  const { language } = useSelector((state) => state.systemPreference);

  return (
    <LangContext.Provider value={multiLang[language]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="catalog" element={<Main />} exact />
          <Route path="catalog/:articleId" element={<Article />} />
          <Route
            path="*"
            element={<div style={{ color: 'white' }}>not found</div>}
          />
        </Routes>
        {modal === 'basket' && <Basket />}
      </BrowserRouter>
    </LangContext.Provider>
  );
}

export default React.memo(App);
