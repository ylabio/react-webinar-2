import React, { useCallback } from 'react';
import Main from './main';
import Basket from './basket';
import useSelector from '../utils/use-selector';
import { Route, Routes } from 'react-router-dom';
import ItemPage from '../components/item-page';
import useStore from '../utils/use-store';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log('App');

  const store = useStore();

  const modal = useSelector((state) => state.modals.name);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  };

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));


  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              addToBasket={callbacks.addToBasket}
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
            />
          }
        />
        <Route
          path="/:id"
          element={
            <ItemPage
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
              addToBasket={callbacks.addToBasket}
            />
          }
        />
      </Routes>
      {modal === 'basket' && <Basket />}
    </>
  );
}

export default React.memo(App);
