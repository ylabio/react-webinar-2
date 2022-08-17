import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import Description from './description';

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
        <Route path="/article/:id" element={<Description />} />
      </Routes>
    </>
  );
}

export default React.memo(App);
