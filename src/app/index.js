import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import Article from './article';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      {modal === 'basket' && <Basket/>}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="articles/:id" element={<Article />} />
      </Routes>
    </>
  );
}

export default React.memo(App);
