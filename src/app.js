import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';
import Cart from './components/cart';

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
    }, []),
    calcCost: useCallback(() => {
      return store.calcCost();
    }, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      {modalActive &&
        <Modal name={"Корзина"}
          modalActive={modalActive}
          setModalActive={setModalActive}
          content={
            <Cart calcCost={callbacks.calcCost}
            cart={store.getState().cart}
            onDelete={callbacks.onDelete} />
          }/>}

      <List items={store.getState().items}
        cart={store.getState().cart}
        onAdd={callbacks.onAdd}
        calcCost={callbacks.calcCost}
        setModalActive={setModalActive}
      />
    </Layout>
  );
}

export default App;
