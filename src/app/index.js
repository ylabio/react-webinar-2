import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import { Routes , Route , BrowserRouter } from 'react-router-dom';
import ProductPage from './product-page';

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
        <Route path={"/"}
               element={<Main />}
               />
        <Route path={"/:pageNumber"}
               element={<Main />}
               />
        <Route path={"products/:id"}
               element={<ProductPage />}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
      </BrowserRouter>
    </>
  );
}

export default React.memo(App);
