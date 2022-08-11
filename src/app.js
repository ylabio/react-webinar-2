import React, { useCallback, useState } from 'react';
import Controls from './components/controls';
import ListKatalog from './components/lists/list-katalog';
import Layout from './components/layout';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const { amountItemsInCart, uniqueItemsInCart, items, cart } = store.getState();

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

  return (
    <>
      <Layout head={<h1>Приложение на чистом JS</h1>} showCart={showCart}>
        <Controls
          amountItemsInCart={amountItemsInCart}
          onToggleCart={callbacks.onToggleCart}
          uniqueItemsInCart={uniqueItemsInCart}
        />
        <ListKatalog items={items} onAddItemInCart={callbacks.onAddItemInCart} />
      </Layout>

      {showCart && (
        <Cart
          items={cart}
          amountItemsInCart={amountItemsInCart}
          onToggleCart={callbacks.onToggleCart}
          onDeleteItemFromCart={callbacks.onDeleteItemFromCart}
        />
      )}
    </>
  );
}

export default App;
