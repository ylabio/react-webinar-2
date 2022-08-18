import React, {useEffect, useState} from 'react';
import { Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import Product from './product';
import useStore from '../utils/use-store';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const store = useStore();
  const modal = useSelector(state => state.modals.name);

  useEffect(() => store.get('app').initLocale(), [])

  return (
    <>
      <Routes>
        <Route path="/:page" element={<Main/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="*" element={<Main/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
