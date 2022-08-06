import React, { useCallback } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({ code, title: `Новая запись ${code}` });
    }, []),
    onAddItem: useCallback((code) => {
      store.addCartItem(code);
    }, []),
    onDeleteItem: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),
  };

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls
        onDeleteItem={callbacks.onDeleteItem}
        cartItems={store.getState().cart}
        onAdd={callbacks.onAdd}
      />
      <List items={store.getState().items} onAddItem={callbacks.onAddItem} />
    </Layout>
  );
}

export default App;
