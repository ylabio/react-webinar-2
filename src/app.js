import React, { useCallback } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {

  const callbacks = {
    onModalTogge: useCallback(() => {
      store.modalTogge();
    }, []),
    onRemoveItemFromBasket: useCallback((code) => {
      store.removeItemFromBasket(code);
    }, []),
    onAddItemToBasket: useCallback((code) => {
      store.addItemToBasket(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        basketItems={store.getState().basketItems}
        basketUniqueItems={store.getState().basketUniqueItems}
        onModalTogge={callbacks.onModalTogge}
      />
      <List
        items={store.getState().items}
        addItemToBasket={callbacks.onAddItemToBasket}
      />
      <Modal
        items={store.getState().basketUniqueItems}
        basketItems={store.getState().basketItems}
        isModalActive={store.getState().isModalActive}
        onModalTogge={callbacks.onModalTogge}
        onRemoveItemFromBasket={callbacks.onRemoveItemFromBasket}
      />
    </Layout>
  );
}

export default App;

