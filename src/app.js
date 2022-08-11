import React, { useCallback, useEffect, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "./components/cart";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modal, setModal] = useState(false); // модальное окно

  const { itemsInCart, totalPrice } = store.state.cart;

  console.log(store.state.cart.totalQuantity);

  const callbacks = {
    toggleModal: useCallback(() => {
      setModal(!modal);
    }, [modal, setModal]),
    addItemInCart: useCallback((code) => {
      store.addItemInCart(code);
      store.updateCart();
    }, []),
    removeItem: useCallback((code) => {
      store.removeItem(code);
      store.updateCart();
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        totalPrice={totalPrice}
        cartLength={itemsInCart.length}
        showModal={callbacks.toggleModal}
      />
      <List
        items={store.getState().items}
        component={(item) => (
          <Item
            item={item}
            key={item.code}
            addItemInCart={callbacks.addItemInCart}
          />
        )}
      />
      {modal && (
        <Cart
          itemsInCart={itemsInCart}
          totalPrice={totalPrice}
          closeModal={callbacks.toggleModal}
          removeItem={callbacks.removeItem}
        />
      )}
    </Layout>
  );
}

export default App;
