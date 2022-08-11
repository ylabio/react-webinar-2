import React, { useCallback, useState } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";

import LayoutModal from './components/layout-modal';
import BasketProduct from './components/basket-product';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [active, setActive] = useState(false);
  const callbacks = {



    onAddItemInBasket: useCallback((item, basket) => {
      store.onAddItemInBasket(item, basket)
    }, []),



    onDeleteItems: useCallback((code, amountInBasket, price) => {
      store.deleteItem(code, amountInBasket, price);
    }, []),

  }
  return (
    <>
      <LayoutModal active={active}
        setActive={setActive} head={<p>Корзина</p>}>
        <BasketProduct
          basket={store.getState().basket}

          priceProduct={store.getState().priceProduct}
          onDeleteItems={callbacks.onDeleteItems}
        />
      </LayoutModal>

      <Layout head={<h1>Магазин</h1>}>
        <Controls
          setActive={setActive}
          priceProduct={store.getState().priceProduct}
          amountProduct={store.getState().amountProduct}
        />

        <List
          onAddItemInBasket={callbacks.onAddItemInBasket}
          items={store.getState().items}
          basket={store.getState().basket}
        />
      </Layout>
    </>
  );
}

export default App;
