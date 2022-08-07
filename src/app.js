import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter, counterCart} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAdd: useCallback((code) => {
      store.addItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls cart={store.getState().cart}
                totalPrice={store.getState().totalPrice}
                totalCount={store.getState().totalCount}
                onDeleteItems={callbacks.onDeleteItems}
      />
      <List items={store.getState().items}
            onAdd={callbacks.onAdd}
      />
    </Layout>
  );
}

export default App;
