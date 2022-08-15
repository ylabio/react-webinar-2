import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import ItemPage from './item-page';
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
        <Route path='/' element={<Main />} />
        <Route path='/item/:id' element={<ItemPage />} />
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
