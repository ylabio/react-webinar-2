import React from 'react';
import Main from "./main";
import ItemPage from "./item-page";
import Basket from "./basket";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import useSelector from "../utils/use-selector";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/item/:id" element={<ItemPage/>}/>
        <Route path="/*" element={<Navigate to={"/"}/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);
