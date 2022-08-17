import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Main from './main';
import ItemDetails from './item-details';
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
        <Route path="/" element={<Main />} />
        <Route path="items/:itemId" element={<ItemDetails />} />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
