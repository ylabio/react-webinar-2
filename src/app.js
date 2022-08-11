import React, { useCallback } from "react";
import List from "./components/list";
import Layout from "./components/layout";
import CartStat from "./components/cart-stat";
import Cart from "./components/cart";
import "./style.css";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const callbacks = {
    addToCart: useCallback(({ code, title, price }) => {
      store.addItemToCart({ code, title, price });
    }),
    deleteFromCart: useCallback(({ code }) =>
      store.deleteItemFromCart({ code })
    ),
    toggleCartVisibility: useCallback(() => {
      store.toggleCartVisibility();
    }),
  };

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <CartStat
          price={store.getState().total_cart_price}
          quantity={store.getState().total_cart_quantity}
          onOpenCart={callbacks.toggleCartVisibility}
        />
        <List
          items={store.getState().items}
          onButtonClick={callbacks.addToCart}
          buttonLabel={"Добавить"}
        />
      </Layout>
      {store.getState().cartVisibility && (
        <Cart
          cart={store.getState().cart}
          total_price={store.getState().total_cart_price}
          total_quantity={store.getState().total_cart_quantity}
          onCloseCart={callbacks.toggleCartVisibility}
          onButtonClick={callbacks.deleteFromCart}
          buttonLabel={"Удалить"}
        />
      )}
    </>
  );
}

export default App;
