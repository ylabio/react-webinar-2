import React from 'react';
import Main from './main';
import Basket from './basket';
import useSelector from '../utils/use-selector';
import { Route, Routes } from 'react-router-dom';
import Description from './description';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  const modal = useSelector((state) => state.modals.name);

  return (
    <>
      {modal === 'basket' && <Basket />}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="articles/:id" element={<Description />} />
      </Routes>
    </>
  );
}

export default React.memo(App);
