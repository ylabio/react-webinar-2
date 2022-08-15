import React from 'react';

import Basket from './basket';
import useSelector from '../utils/use-selector';
import {Outlet} from 'react-router-dom';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <Outlet />
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
