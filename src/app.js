import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAdd: useCallback((code) => {
      store.addItem(code);
      console.log(store.getState());
    }, []),
    onDelete: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls cart={store.getState().shoppingCart} 
            onAdd={callbacks.onAdd}
      />
      <List items={store.getState().items}
            onItemAdd={callbacks.onAdd}
      />
    </Layout>
  );
}

export default App;
