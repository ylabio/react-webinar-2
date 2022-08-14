import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import ProductCard from "./product-card";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Main/>}>
          </Route>
          <Route path="/:id" element={<ProductCard/>} />
        </Routes>
          {modal === 'basket' && <Basket/>}
      </Router>
  );
}

export default React.memo(App);

