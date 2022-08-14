import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
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

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/1" />} />
        <Route path="/:page" element={<Main />} />
        <Route path="/description/" element={<Description  />}>
          <Route path=":id" element={<Product />} />
        </Route>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
