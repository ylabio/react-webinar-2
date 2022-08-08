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
  const [cartActive, setCartActive] = useState(false);
  const totalPrice = store.state.cart.reduce((sum, item) => {
    return sum + (item.cartCount * item.price);
  }, 0);

  const callbacks = {
    addToCart: useCallback((code) => {
      store.addToCart(code);
    }, []),
    deleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),
    openModal: useCallback(() => {
      setCartActive(true);
    })
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls openModal={callbacks.openModal}
        cart={store.state.cart}
        totalPrice={totalPrice}
      />
      <List items={store.getState().items}
        btnHandler={callbacks.addToCart}
        btnText='Добавить'
        countClass='Item-count-hidden'
      />
      <Modal cartActive={cartActive} setCartActive={setCartActive} >
        <Title title="Корзина" />
        <List items={store.getState().cart}
          btnHandler={callbacks.deleteFromCart}
          btnText='Удалить'
        />
        <Total totalPrice={totalPrice} />
      </Modal>
    </Layout>
  );
}

export default App;
