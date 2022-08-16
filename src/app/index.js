import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {Navigate, Route, Routes} from "react-router";
import Description from "./description";
import Product from "../components/product";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

   const PATH = {
    MAIN: ':page',
    DESCRIPTION: 'description',
    PRODUCT: ':id'
  }

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/1" />} />
        <Route path={PATH.MAIN} element={<Main />} />
        <Route path={PATH.DESCRIPTION} element={<Description  />}>
          <Route path={PATH.PRODUCT} element={<Product />} />
        </Route>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
