import React, { useCallback } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const products = store.getState().items;
  const cart = store.getState().cart;
  const cartAmount = store.getTotalAmount();

  const [isModalOpen, setModalOpen] = React.useState(false);

  const callbacks = {
    onCartClick: useCallback(() => {
      setModalOpen(true);
    }, []),
    onAdd: useCallback((item) => {
      store.addItemToCart(item);
    }, []),
    onDelete: useCallback((item) => {
      store.deleteItemFromCart(item);
    }, []),
    onCloseModal: useCallback(() => {
      setModalOpen(false);
    }),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        onCartClick={callbacks.onCartClick}
        amount={cartAmount}
        cartLength={cart.length}
      />
      <List items={products} onButtonClick={callbacks.onAdd} />
      {isModalOpen && (
        <Cart
          cart={cart}
          cartAmount={cartAmount}
          onClose={callbacks.onCloseModal}
          deleteItem={callbacks.onDelete}
        />
      )}
    </Layout>
  );
}

export default App;
