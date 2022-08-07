import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Button from "./components/button";
import BasketDisplay from "./components/basket-display";
import Item from "./components/item";
import Basket from "./components/basket";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { items } = store.getState();
  const { basket } = store.getState();

  const callbacks = {
    addToBasket: useCallback((code) => {
      store.addToBasket(code);
    }, []),

    closeModal: useCallback(() => {
      setModalIsOpen(false);
    }, [modalIsOpen]),

    openModal: useCallback(() => {
      setModalIsOpen(true);
    }, [modalIsOpen]),
  };

  return (
    <Layout head={<h1>Магазин</h1>} maxWidth="1024px" minHeight="100vh">
      <Controls callbacks={[callbacks.openModal]} basketData={basket} />
      {modalIsOpen && (
        <Modal closeModal={callbacks.closeModal}>
          <Basket />
        </Modal>
      )}
      <List
        itemsData={items}
        itemsComponent={[Item, [Button, "Добавить", callbacks.addToBasket]]}
      />
    </Layout>
  );
}

export default App;
