import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Article from './article';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/article/:id' element={<Article />}></Route>
      </Routes>
      {modal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default React.memo(App);
