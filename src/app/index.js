import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import routes from '../API/routes';
import ItemPage from '../components/item-page';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.main()} element={<Main/>} />
        <Route path={routes.basket()} element={<Basket/>} />
        <Route path={routes.itemPage(':itemId')} element={<ItemPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default React.memo(App);
