import React, { useCallback } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";

import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({code, title: `Новая запись ${code}`});
    }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }
function App({ store }) {
  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({ code, title: `Новая запись ${code}` });
    }, []),
    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),
    onAddItemToCard: useCallback((code) => {
      store.addItem(code);
    }, []),
  }
  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls
        cart={store.getState().cart}
        onItemDeleteFromCart={callbacks.onDeleteFromCart}
      />
      <List items={store.getState().items}
        cards={store.getState().cards}
        onAddItemToCard={callbacks.onAddItemToCard}

      <Controls onAdd={callbacks.onAdd}/>
      <List items={store.getState().items}
            onItemSelect={callbacks.onSelectItems}
            onItemDelete={callbacks.onDeleteItems}
      />
    </Layout>
  );
}
export default App;
