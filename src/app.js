import React, { useCallback, useState } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import Basket from './components/basket';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [active, setActive] = useState(false);
  const callbacks = {
    onAddBasket: useCallback((code, title, price) => {

      store.addBasket({ code: code, title: title, price: price });

    }, []),
    onAmountProduct: useCallback(() => {
      store.counterProduct()

    }, []),
    onAmountInBasket: useCallback((item) => {
      store.amountInBasket(item)
    }, []),
    onPriceProduct: useCallback((price) => {
      store.priceProduct(price)
    }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code, amountInBasket, price) => {
      store.deleteItem(code, amountInBasket, price);
    }, []),

  }
  return (
    <>
      <Basket
        basket={store.getState().basket}
        active={active}
        setActive={setActive}
        priceProduct={store.getState().priceProduct}
        onDeleteItems={callbacks.onDeleteItems}
      />
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          setActive={setActive}
          priceProduct={store.getState().priceProduct}
          amountProduct={store.getState().amountProduct}
        />

        <List
          onAmountProduct={callbacks.onAmountProduct}
          onPriceProduct={callbacks.onPriceProduct}
          onAmountInBasket={callbacks.onAmountInBasket}
          priceProduct={store.getState().priceProduct}
          amountProduct={store.getState().amountProduct}
          items={store.getState().items}
          onAddBasket={callbacks.onAddBasket}
          basket={store.getState().basket}
        />
      </Layout>
    </>
  );
}

export default App;
