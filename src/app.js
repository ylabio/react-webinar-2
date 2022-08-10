import React, { useCallback, useState } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Title from "./components/title";
import Total from "./components/total";
import './normalize.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modalActive, setModalActive] = useState(false);

  const callbacks = {
    addToCart: useCallback((code) => {
      store.addToCart(code);
    }, []),
    deleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),
    openModal: useCallback(() => {
      setModalActive(true);
    })
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls openModal={callbacks.openModal}
        itemsInCart={store.state.itemsInCart}
        totalPrice={store.state.totalPrice}
      />
      <List items={store.getState().items}
        btnHandler={callbacks.addToCart}
        btnText='Добавить'
        countClass='Item-count-hidden'
      />
      {modalActive ?
        <Modal setModalActive={setModalActive} >
          <Title title="Корзина" />
          <List items={store.getState().cart}
            btnHandler={callbacks.deleteFromCart}
            btnText='Удалить'
          />
          <Total totalPrice={store.state.totalPrice}
            isCartEmpty={store.state.itemsInCart === 0}
          />
        </Modal>
        : null}
    </Layout>
  );
}

export default App;
