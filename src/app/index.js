import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Main from "./main";
import Article from './article';
import NoMatch from './no-match';
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";

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
        <Route index path='/' element={<Main />}/>
        <Route path='article'>
          <Route path=':_id' element={<Article />}/>
        </Route>
        <Route path='*' element={<NoMatch />}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
    
  );
}

export default React.memo(App);
