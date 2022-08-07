import React, { useState, useCallback } from 'react';
import Layout from "./components/layout";
import Cart from './components/cart';
import CartTotal from './components/cart-total';
import Controls from "./components/controls";
import Item from './components/item';
import Modal from './components/modal';
import './tags.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */

function App({ store }) {
  const state = store.getState();
  const [modalOpened, setModalOpened] = useState(false);

  const callbacks = {
    addToCart: useCallback(code => {
      store.addToCart(code);
    }, []),
    removeFromCart: useCallback(code => {
      store.removeFromCart(code);
    }, []),
    openModal: useCallback(() => {
      setModalOpened(true);
    }, []),
    closeModal: useCallback(() => {
      setModalOpened(false);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls btnText='Перейти' btnAction={callbacks.openModal}>
        <CartTotal title='В корзине:' price={state.cart.totalPrice} count={state.cart.distinctItems} />
      </Controls>

      <ul>{ state.catalogItems.map(item =>
        <Item
          key={item.code}
          code={item.code}
          title={item.title}
          param={item.price + " ₽"}
          btnText='Добавить'
          btnAction={callbacks.addToCart} />
      ) }</ul>

      <Modal opened={modalOpened} closingFunc={callbacks.closeModal}>
        <Cart state={state.cart} btnAction={callbacks.closeModal} itemAction={callbacks.removeFromCart} />
      </Modal>
    </Layout>
  );
}

export default App;
