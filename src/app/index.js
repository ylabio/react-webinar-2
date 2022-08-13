import React from 'react';
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { Route, Routes } from 'react-router-dom';
import Main from './main';
import Card from './card';
import { config } from '../config';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={config.routes.home_page} element={<Main />} />
        <Route path={config.routes.product + ':id'} element={<Card />} />
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
