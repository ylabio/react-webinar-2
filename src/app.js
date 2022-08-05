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
    callModal: useCallback(() => {
    }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    addToCart: useCallback((item) => {
      store.addToCart(item);
    }, []),
  }

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls callModal={callbacks.callModal} cart={store.getState().cart}/>
      <List items={store.getState().items}
            onItemSelect={callbacks.onSelectItems}
            addToCart={callbacks.addToCart}
      />
    </Layout>

  );
};

export default App;
