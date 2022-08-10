import React, { useState, useCallback } from "react";
import Modal from "./components/modal";
import Buy from "./components/buy";
import List from "./components/list";
import Cart from "./components/cart";
import Layout from "./components/layout";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modal, setModal] = useState(false);

  const callbacks = {
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, []),
  };

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Buy
          allPrice={store.getState().allPrice}
          allItems={store.getState().allItems}
          setModal={setModal}
        />
        <List items={store.getState().items} itemClick={callbacks.onAddItem} />
      </Layout>
      {modal && (
        <Modal setModal={setModal} head={<h1>Корзина</h1>}>
          <Cart
            buyState={store.getState().itemsBuy.sort((a, b) => a.code - b.code)}
            allPrice={store.getState().allPrice}
            itemClick={callbacks.onDeleteItems}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
