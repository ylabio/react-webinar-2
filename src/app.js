import React, { useCallback } from "react";
import List from "./components/list";
import Layout from "./components/layout";
import CartStat from "./components/cart-stat";
import "./style.css";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const callbacks = {};

  return (
    <Layout head={<h1>Магазин</h1>}>
      <CartStat cart={store.getState().cart} />
      <List items={store.getState().items} />
    </Layout>
  );
}

export default App;
