import React, { useState, useCallback } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Totals from "./components/totals";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modalOpen, setModalOpen] = useState(false);

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    onRemoveItemFromCart: useCallback((code) => {
      store.removeItemFromCart(code);
    }, []),
    onModalOpen: useCallback(() => {
      setModalOpen(!modalOpen);
    }, [modalOpen]),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        cart={store.getState().cart}
        onClickToggle={callbacks.onModalOpen}
      />
      <List items={store.getState().items} onCart={callbacks.onAddItemToCart} />
      {modalOpen ? (
        <Modal head={<h1>Корзина</h1>} onClickToggle={callbacks.onModalOpen}>
          <List
            items={store.getState().cart}
            buttonAssign="Удалить"
            onCart={callbacks.onRemoveItemFromCart}
          />
          <Totals cart={store.getState().cart} />
        </Modal>
      ) : null}
    </Layout>
  );
}

export default App;
