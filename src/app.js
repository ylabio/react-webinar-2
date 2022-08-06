import React, { useCallback } from "react";
import List from "./components/list";
import Layout from "./components/layout";
import CartPreview from "./components/cart-preview";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    onItemDeletedFromCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <CartPreview
        cart={store.getSortedCart()}
        currency={store.getState().currency}
        onItemDeletedFromCart={callbacks.onItemDeletedFromCart}
      />
      <List
        items={store.getState().items}
        currency={store.getState().currency}
        onItemAddedToCart={callbacks.onAddToCart}
      />
    </Layout>
  );
}

export default App;
