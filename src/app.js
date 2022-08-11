import React, { useCallback } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Card from "./components/card";
import { nanoid } from "nanoid";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const callbacks = {
    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, []),
    onModalClose: useCallback(() => {
      store.onModalClose();
    }, []),
    onShowModal: useCallback(() => {
      store.showModal();
    }, []),
    onDeleteCardItem: useCallback((code) => {
      store.deleteCardItem(code);
    }, []),
  };
  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          onShowModal={callbacks.onShowModal}
          cardItems={store.getState().card}
          info={store.getState().info}
        />
        <List
          items={store.getState().items}
          onItemSelect={callbacks.onSelectItems}
          onItemAdd={callbacks.onAddItem}
        />
      </Layout>
      {store.getState().modal && (
        <Card
          onCardItemDelete={callbacks.onDeleteCardItem}
          onModalClose={callbacks.onModalClose}
          cardItems={store.getState().card}
        />
      )}
    </>
  );
}

export default App;
