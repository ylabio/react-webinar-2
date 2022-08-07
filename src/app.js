import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout/layout";
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
    onPutItemToBasket: useCallback((code) => {
      store.putItemToBasket(code);
    }, []),
  }

  

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onAdd={callbacks.onAdd}/>
      <List items={store.getState().items}
            onItemSelect={callbacks.onSelectItems}
            onPutItemToBasket={callbacks.onPutItemToBasket}
      />
    </Layout>
  );
}

export default App;
