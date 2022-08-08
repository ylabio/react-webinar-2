import React, { useState, useCallback } from "react";
import Modal from "./components/modal";
import Buy from "./components/buy";
import List from "./components/list";
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
    <Layout
      head={<h1>Магазин</h1>}
      modal={modal}
      componentModal={
        <Modal
          setModal={setModal}
          buyState={store.getState().itemsBuy.sort((a, b) => a.code - b.code)}
          itemClick={callbacks.onDeleteItems}
          head={<h1>Корзина</h1>}
        />
      }
    >
      <Buy buyState={store.getState().itemsBuy} setModal={setModal} />
      <List items={store.getState().items} itemClick={callbacks.onAddItem} />
    </Layout>
  );
}

export default App;
