import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout/layout";
import {counter} from "./utils";
import ModalBasket from './components/modalBasket/modalBasket';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onItemDelete: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onPutItemToBasket: useCallback((code) => {
      store.putItemToBasket(code);
    }, []),
  }


  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls state={store.getState()}
                onItemDelete={callbacks.onItemDelete}
      />
      <List items={store.getState().items}
            onPutItemToBasket={callbacks.onPutItemToBasket}
      />
    </Layout>
  );
}

export default App;
