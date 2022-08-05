import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import BasketPopup from "./components/basket-popup"
import {counter} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAdd: useCallback((count) => {
      const code = counter();
      store.addProduct(code, count);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
     <>
    <Layout head={<h1>Магазин</h1>}>
      {/*<BasketPopup*/}
      {/*    items={store.getState().userProducts}*/}
      {/*/>*/}
          <Controls userProducts={store.getState().userProducts}/>
          <List items={store.getState().items}
            // onItemSelect={callbacks.onSelectItems}
            onItemDelete={callbacks.onDeleteItems}
          />
    </Layout>
       </>
  );
}

export default App;
