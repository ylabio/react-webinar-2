import React, {useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemPage from "./item-page";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path='/item/:itemId' element={<ItemPage/>} />
          <Route path='/page:pageNumber' element={<Main/>} />
        </Routes>
       {modal === 'basket' && <Basket/>}
      </Router>
    </>
  );
}

export default React.memo(App);
