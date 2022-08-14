import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import useSelector from '../utils/use-selector';

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
        <Route path='/' element={<Main />} />
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem', background: '#fff', minHeight: '100vh'}}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
