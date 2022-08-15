import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ProductInformation from "./product-information";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  
  console.log('App');
  
  const {modal} = useSelector(state => {
    return {
      id: state.product.id,
      isLoading: state.product.isLoading,
      modal: state.modals.name
    }
  })
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/productInformation/*" element={<ProductInformation/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);
