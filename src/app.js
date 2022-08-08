import React, { useCallback, useState } from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import { counter } from './utils';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [showCart, setShowCart] = useState(false);

  const callbacks = {
    onAddItemInCart: useCallback((item) => {
      store.addItemToCart(item);
    }, []),
    onDeleteItemFromCart: useCallback((item) => {
      store.deleteItemFromCart(item);
    }, []),
    onToggleCart: useCallback((flag) => {
      setShowCart(flag);
    }, []),
  };

  const cartInfo = store.getCartInfo();

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls
        cartQuantity={cartInfo.quantity}
        cartPrice={cartInfo.price}
        onToggleCart={callbacks.onToggleCart}
      />
      <List items={store.getState().items} onAddItemInCart={callbacks.onAddItemInCart} />

      {showCart && (
        <Cart
          items={store.getState().cart}
          cartPrice={cartInfo.price}
          onToggleCart={callbacks.onToggleCart}
          onDeleteItemFromCart={callbacks.onDeleteItemFromCart}
        />
      )}
    </Layout>
  );
}

export default App;
