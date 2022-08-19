import CartProduct from "cart-product";
import Main from "main";
import React from 'react';
import {Route, Routes} from "react-router-dom";
import useSelector from "../utils/use-selector";
import Basket from "./basket";

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
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/:id'} element={<CartProduct/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
