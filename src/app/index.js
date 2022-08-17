import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import routes from '../API/routes';
import ItemPage from './item-page';
import useSelector from "../utils/use-selector";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.main()} element={
          <>
            <Main/>
            {modal === 'basket' && <Basket/>}
          </>
          } />
        <Route path={routes.itemPage(':itemId')} element={
          <>
            <ItemPage/>
            {modal === 'basket' && <Basket/>}
          </>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default React.memo(App);
