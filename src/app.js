import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modal, setModal] = useState(false);

  const callbacks = {
    showModal: () => {
      setModal(!modal);
      console.log("setModal");
    },

    addItemInCart: (code) => {
      console.log(store.getCartItems());
      store.addItemInCart(code);
    },

    // onAdd: useCallback(() => {
    //   const code = counter();
    //   store.createItem({code, title: `Новая запись ${code}`});
    // }, []),
    // onDeleteItems: useCallback((code) => {
    //   store.deleteItem(code);
    // }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls totalPrice={223} showModal={callbacks.showModal} />
      <List
        items={store.getState().items}
        addItemInCart={callbacks.addItemInCart}
      />
      {modal && <Cart cartItems={store.getCartItems()} />}
    </Layout>
  );
}

export default App;
