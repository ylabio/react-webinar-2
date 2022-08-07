import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modalActive, setModalActive] = useState(false);

  const callbacks = {
    onDelete: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),
    onAdd: useCallback((code) => {
      store.addToCart(code);
    }, [])
  }

  const calcCost = () => {
    const items = store.getState().cart;
    let sum = 0;
    items.forEach(item => {
      sum += item.number * item.price
    });
    return sum.toLocaleString('ru');
  };

  const calcNumber = () => {
    const items = store.getState().cart;
    let number = 0;
    items.forEach(item => {
      number += item.number
    })
    return number.toLocaleString('ru');
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Modal calcCost={calcCost}
        name={"Корзина"}
        modalActive={modalActive}
        setModalActive={setModalActive}
        cart={store.getState().cart}
        onDelete={callbacks.onDelete} />
      <List items={store.getState().items}
        cart={store.getState().cart}
        onAdd={callbacks.onAdd}
        calcCost={calcCost}
        setModalActive={setModalActive}
        calcNumber={calcNumber}
      />
    </Layout>
  );
}

export default App;
