import React, { useCallback, useState } from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const cartArray = store.getState().cartItems;
  const cartTotalCount = store.getState().cartTotalCount;
  const cartTotalPrice = store.getState().cartTotalPrice;

  const [isModalActive, setIsModalActive] = useState(false);

  const callbacks = {
    onOpenModal: () => {
      setIsModalActive((prevState) => !prevState);
    },
    onAddItems: useCallback((code, item) => {
      store.addToCart(code, item);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),
  };

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          price={cartTotalPrice}
          count={cartTotalCount}
          onOpenModal={callbacks.onOpenModal}
        />
        <List items={store.getState().items} onItemAdd={callbacks.onAddItems} />
      </Layout>
      {isModalActive && (
        <Modal head={<h2>Корзина</h2>} onOpenModal={callbacks.onOpenModal}>
          <Cart
            onItemDelete={callbacks.onDeleteItems}
            items={cartArray}
            price={cartTotalPrice}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
