import React from 'react';
import useSelector from '../utils/use-selector';
import Basket from './basket';
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
      <Main />
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
