import React, { useCallback } from 'react';
import Main from "./main";
import Basket from "./basket";
import Product from "./product";
import useSelector from "../utils/use-selector";
import { Routes, Route } from 'react-router-dom';






/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);

  console.log('App');



  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='product' element={<Product />} />
        {/* Было не так долго, как написать свою собственную пагинацию */}
        {modal === 'basket' && <Route index element={<Basket />} />}
      </Routes>
    </>
  );
}

export default React.memo(App);
