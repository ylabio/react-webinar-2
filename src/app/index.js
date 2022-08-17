import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom'
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import Article from "./article";

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
        <Route path={`:lang/`} element={<Main/>}/>
        <Route path={`:lang/:id`} element={<Article/>}/>
      </Routes>
      <Main/>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
