import React, {useEffect} from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductInformation from "./product-information";
import {translateLanguage} from "../utils/translate-language";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  
  console.log('App');
  
  const {modal} = useSelector(state => {
    return {
      modal: state.modals.name,
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
