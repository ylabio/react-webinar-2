import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Button from "./components/button";
import Item from "./components/item";
import Basket from "./components/basket";
import Modal from "./components/modal";
import propTypes from "prop-types";

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
          <Basket
            itemsPrice={basket.itemsPrice}
            itemsAmount={basket.itemsAmount}
            basketItems={basket.items}
            deleteFromBasket={store.deleteFromBasket.bind(store)}
            getState={store.getState.bind(store)}
          />
        </Modal>
      )}
      <List
        itemsData={items}
        itemsComponent={[Item, [Button, "Добавить", callbacks.addToBasket]]}
      />
    </Layout>
  );
}

App.propTypes = {
  store: propTypes.object.isRequired,
};

export default App;
