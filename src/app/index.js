import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import Article from './article';
import useSelector from "../utils/use-selector";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/article/:articleId'} element={<Article/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);
