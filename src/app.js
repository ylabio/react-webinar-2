import React, { useCallback } from "react";
import Cart from "./components/cart";
import List from "./components/list";
import Layout from "./components/layout";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    onRemoveItemFromCart: useCallback((code) => {
      store.removeItemFromCart(code);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Cart
        cart={store.getState().cart}
        onCart={callbacks.onRemoveItemFromCart}
      />
      <List
        items={store.getState().items}
        onCart={callbacks.onAddItemToCart}
      />
    </Layout>
  );
}

export default App;
