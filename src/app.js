import React, { useCallback } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import BasketFinalPrice from "./components/basket-final-price";

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
        amountOfUniqueGoodsInBasket={store.getState().amountOfUniqueGoodsInBasket}
        totalPriceGoodsInBasket={store.getState().totalPriceGoodsInBasket}
        onModalTogge={callbacks.onModalTogge}
      />
      <List
        items={store.getState().items}
        addItemToBasket={callbacks.onAddItemToBasket}
      />
      {store.getState().isModalActive && <Modal
        head={'Корзина'}
        amountOfUniqueGoodsInBasket={store.getState().amountOfUniqueGoodsInBasket}
        isModalActive={store.getState().isModalActive}
        onModalTogge={callbacks.onModalTogge}
      >
        <List
          items={store.getState().basketItems}
          basketItems={store.getState().basketItems}
          totalPriceGoodsInBasket={store.getState().totalPriceGoodsInBasket}
          isModalActive={store.getState().isModalActive}
          onModalTogge={callbacks.onModalTogge}
          onRemoveItemFromBasket={callbacks.onRemoveItemFromBasket}
        ></List>
        <BasketFinalPrice
          totalPriceGoodsInBasket={store.getState().totalPriceGoodsInBasket}
          amountOfUniqueGoodsInBasket={store.getState().amountOfUniqueGoodsInBasket}
        />
      </Modal>}
    </Layout>
  );
}

export default App;

