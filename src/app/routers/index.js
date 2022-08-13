import React from 'react';
import {Route, Routes} from "react-router-dom";
import CartProduct from "src/app/cart-product";
import Main from "src/app/main";

export const Routers = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Main/>}/>
      <Route path={'/:id'} element={<CartProduct/>}/>
    </Routes>
  );
};