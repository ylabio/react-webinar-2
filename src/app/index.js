import React, { useCallback, useState } from 'react';
import Main from './main';
import Basket from './basket';
import useStore from '../utils/use-store';
import useSelector from '../utils/use-selector';
import { Route, Routes } from 'react-router-dom';
import Shop from './shop';
import ItemPage from './itempage';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log('App');

  const [title, setTitle] = useState('');

  const modal = useSelector((state) => state.modals.name);

  const callbacks = {
    setTitle: useCallback((title) => setTitle(title), []),
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Main title={title} />}>
          <Route index element={<Shop setTitle={callbacks.setTitle} />} />
          <Route path='/:id' element={<ItemPage setTitle={callbacks.setTitle} />} />
        </Route>
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
