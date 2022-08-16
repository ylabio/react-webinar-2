import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {Route, Routes} from "react-router-dom";
import ProductPage from "./product-page";


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
              <Route path='/' element={
                  <Main/>
              } />
              <Route path='articles/:product'  element={
                  <ProductPage/>
              }/>
          </Routes>
          {modal === 'basket' && <Basket/>}
      </>


  );
}

export default React.memo(App);
