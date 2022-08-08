// @ts-nocheck
import React, { useCallback } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Basket from "./components/basket";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */

function App({ store }) {
  const [activeModal, setActiveModal] = React.useState(false);

  const callbacks = {
    getModal: useCallback((useModal) => {
      setActiveModal(useModal);
    }, []),
    addItemsToBasket: useCallback((obj) => {
      store.addItemsToBasket(obj);
    }, []),
    deleteItemsFromBasket: useCallback((obj) => {
      store.deleteItemsFromBasket(obj);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        totalPrice={store.state.basket.totalPrice}
        amountBasketItems={store.state.basket.items.length}
        getModal={callbacks.getModal}
      />
      <List
        addItemsToBasket={callbacks.addItemsToBasket}
        items={store.getState().items}
      />
      {activeModal && (
        <Basket
          totalPrice={store.state.basket.totalPrice}
          basketItems={store.state.basket.items}
          deleteItemsFromBasket={callbacks.deleteItemsFromBasket}
          getModal={callbacks.getModal}
        />
      )}
    </Layout>
  );
}

export default App;
