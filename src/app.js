import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Basket from "./components/basket";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modalOpen, setModalOpen] = useState(false);
  const callbacks = {
    addItemToCart: useCallback((code) => {
      store.addToCart(code);
    }, []),

    removeItemToCart: useCallback((code) => {
      store.removeItemToCart(code);
    }, []),

    openToCart: useCallback(() => {
      setModalOpen(true);
    }, []),

    closeToCart: useCallback(() => {
      setModalOpen(false);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        overall={store.getState().overall}
        quantity={store.getState().basket.length}
        openToCart={callbacks.openToCart}
      />
      <List
        items={store.getState().items}
        addItemToCart={callbacks.addItemToCart}
      />
      <Basket
        items={store.getState().basket}
        modalOpen={modalOpen}
        closeToCart={callbacks.closeToCart}
        removeItemToCart={callbacks.removeItemToCart}
        overall={store.getState().overall}
      />
    </Layout>
  );
}

export default App;
