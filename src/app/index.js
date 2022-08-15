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
  // console.log(window.location.pathname.includes('productInformation/') && window.location.pathname.split('productInformation/')[1])
  const modal = useSelector(state => state.modals.name);
  
  const {id, isLoading} = useSelector(state => {
    return {
      id: state.product.id,
      isLoading: state.product.isLoading
    }
  })
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/productInformation/*" element={id || isLoading ? <ProductInformation/> : <Navigate to='/'/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);
