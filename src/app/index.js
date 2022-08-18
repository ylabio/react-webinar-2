import React from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Product from './product';
import Loader from '../components/loader';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);
  const isLoading = useSelector(state => state.loader.isLoading);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='product/:id' element={<Product/>}/>
        </Routes>
        {modal === 'basket' && <Basket/>}
        {isLoading && <Loader />}
      </BrowserRouter>      
    </>
  );
}

export default React.memo(App);
