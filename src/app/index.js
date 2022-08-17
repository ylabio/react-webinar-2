import React from 'react';
import Main from "./main";
import Basket from "./basket";
import Product from './product'
import useSelector from "../utils/use-selector";
import {BrowserRouter, Routes, Route} from "react-router-dom";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);
  const url = useSelector(state => state.catalog.url)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path={`/${url}:id`} element={<Product />} />
        </Routes>
        {modal === 'basket' && <Basket/>}
      </BrowserRouter>
    </>
  );
}

export default React.memo(App);
