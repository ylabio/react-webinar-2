import React, { useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import useSelector from '../utils/use-selector';
import { Routes, Route } from 'react-router-dom';
import ItemInfo from './itemInfo';
import translates from '../utils/translates';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector((state) => state.modals.name);
  const [language, setLanguage] = React.useState('ru');

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Main
              words={translates}
              language={language}
              setLanguage={(lang) => setLanguage(lang)}
            />
          }
        />
        <Route
          path='/articles/:id'
          element={
            <ItemInfo
              words={translates}
              language={language}
              setLanguage={(lang) => setLanguage(lang)}
            />
          }
        />
      </Routes>

      {modal === 'basket' && <Basket words={translates} language={language} />}
    </>
  );
}

export default React.memo(App);
