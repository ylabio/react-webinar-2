import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import Catalog from '../pages/catalog';
import Product from '../pages/product';
import NoPage from '../pages/no-page';
import useSelector from "../utils/use-selector";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route index element={<Catalog />}/>
          <Route path='catalog/:page' element={<Catalog />}/>
          <Route path='product/:id' element={<Product />}/>
          <Route path='*' element={<NoPage />}/>
        </Route>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default React.memo(App);
