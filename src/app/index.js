import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Article from './article';
import Preloader from '../components/preloader';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);
  const loading = useSelector(state => state.catalog.loading);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/:id"  element={<Article/>}  />
          <Route exact path="/" element={<Main/>}/>
        </Routes>
        {modal === 'basket' && <Basket/>}
      </BrowserRouter>
    </>
  );
}

export default React.memo(App);
