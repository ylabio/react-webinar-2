import React from 'react';
import Main from './main';
import Basket from './basket';
import useSelector from '../utils/use-selector';
import { Routes, Route } from 'react-router-dom';
import ItemCard from './item-card';
import { LangContext } from '../store/context';
import useLocalStorage from '../utils/use-local-storage';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log('App');

  const modal = useSelector((state) => state.modals.name);

  // данные контекста для перевода слов
  const [language, handleSetLanguage, content] = useLocalStorage();

  return (
    <>
      <LangContext.Provider value={{ content, handleSetLanguage, language }}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/products/:id' element={<ItemCard />} />
        </Routes>
        {modal === 'basket' && <Basket />}
      </LangContext.Provider>
    </>
  );
}

export default React.memo(App);
