import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Basket from './basket';
import useSelector from '../utils/use-selector';
import Card from './card';
import Main from './main';

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
        <Route path="/*">
          <Route index element={<Main />} />
          <Route path="card/:id" element={<Card />} />
        </Route>
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
