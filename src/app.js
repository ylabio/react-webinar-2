import React, { useCallback, useState } from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const cartArray = store.getState().cartItems;
  const cartTotalCount = cartArray.length;

  const cartTotalPrice = cartArray
    .map((item) => item.price * item.count)
    .reduce((sum, current) => sum + current, 0);

  const [isActive, setIsActive] = useState(false);

  const callbacks = {
    onOpenModal: () => {
      setIsActive((prevState) => !prevState);
    },
    onAddItems: useCallback((code, item) => {
      store.addToCart(code, item);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        price={cartTotalPrice}
        count={cartTotalCount}
        onOpenModal={callbacks.onOpenModal}
      />
      <List items={store.getState().items} onItemAdd={callbacks.onAddItems} />
      <Modal
        cartItems={cartArray}
        active={isActive}
        price={cartTotalPrice}
        onOpenModal={callbacks.onOpenModal}
        onItemDelete={callbacks.onDeleteItems}
      />
    </Layout>
  );
}

export default App;
