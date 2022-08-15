import React, {useCallback, useEffect} from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProductInformation from "./product-information";
import useStore from "../utils/use-store";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  
  console.log('App');
  
  const store = useStore();
  
  const modal = useSelector(state => state.modals.name);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/productInformation" element={<ProductInformation/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);
