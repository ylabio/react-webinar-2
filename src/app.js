import React, { useCallback } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const callbacks = {
    // onAdd: useCallback(() => {
    //   const code = counter();
    //   store.createItem({code, title: `Новая запись ${code}`});
    // }, []),
    // onDeleteItems: useCallback((code) => {
    //   store.deleteItem(code);
    // }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls totalPrice={223} />
      {/*<List items={store.getState().items} />*/}
      <Cart />
    </Layout>
  );
}

export default App;
