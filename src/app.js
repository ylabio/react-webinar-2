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
      document.body.style.paddingRight = window.innerWidth - document.body.clientWidth + 'px';
      document.body.style.overflowY = 'hidden';
    }, []),
    closeModal: useCallback(() => {
      setModalOpened(false);
      document.body.style.paddingRight = document.body.style.overflowY = '';
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls btnText='Перейти' btnAction={callbacks.openModal}>
        <CartTotal title='В корзине:' price={state.cart.totalPrice} count={state.cart.distinctItems} />
      </Controls>

      <ul>{state.catalogItems.map(item =>
        <Item key={item.code}
          code={item.code}
          title={item.title}
          param={item.price}
          btnText='Добавить'
          btnAction={callbacks.addToCart} />
      )}</ul>

      {modalOpened && <Modal closingFunc={callbacks.closeModal}>
        <Cart state={state.cart} btnAction={callbacks.closeModal} itemAction={callbacks.removeFromCart} />
      </Modal>}
    </Layout>
  );
}

export default App;
