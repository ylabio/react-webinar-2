import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
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
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='articles/:id' element={<Article/>}/>
        </Routes>
        {modal === 'basket' && <Basket/>}
      </BrowserRouter>
    </>
  );
}

export default React.memo(App);
