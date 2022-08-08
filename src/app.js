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
    onAdd: useCallback((item) => {
      store.addItemInBasket(item);
    }, []),
    onDeleteOfBasket: useCallback((code) => {
      store.deleteItem(code);
    })
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls 
        stateBasket={store.getState().basket}
        onDeleteOfBasket={callbacks.onDeleteOfBasket}
      />
      <List items={store.getState().items}
            onAdd={callbacks.onAdd}
      />
    </Layout>
  );
}

export default App;
