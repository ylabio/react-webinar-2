import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import Product from "./product";
import useSelector from "../utils/use-selector";
import {appRoute} from "../const";

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
          <Route path={appRoute.Main} element={<Main />} />
          <Route path={appRoute.Catalog} element={<Main />} />
          <Route path={appRoute.Product} element={<Product />} />
        </Routes>
        {modal === 'basket' && <Basket />}
      </BrowserRouter>
    </>
  );
}

export default React.memo(App);
