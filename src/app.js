import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Basket from "./components/Basket";
import Layout from "./components/layout";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [open, setOpen] = useState(false);
  const callbacks = {
    isBasketOpened: useCallback(() => {
      setOpen(!open);
    }, [setOpen, open]),
    onAddToBasket: useCallback((code, title, price) => {
      store.createBasketItem({ code, title, price });
    }, []),
    onDeleteFromBasket: useCallback((code) => {
      store.deleteBasketItem(code);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      {open && (
        <Basket
          isBasketOpened={callbacks.isBasketOpened}
          totalPrice={store.getState().totalPrice}
          basketItems={store.getState().basketItems}
          onDeleteFromBasket={callbacks.onDeleteFromBasket}
        />
      )}
      <Controls
        isBasketOpened={callbacks.isBasketOpened}
        totalPrice={store.getState().totalPrice}
        basketItemsLength={store.getState().basketItems.length}
      />
      <List
        items={store.getState().items}
        onClickButton={callbacks.onAddToBasket}
      />
    </Layout>
  );
}

export default App;
