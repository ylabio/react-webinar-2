import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";

import Busket from './components/busket';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.adderToCart();

    }, []),
    eliminateFromCart: useCallback((item) => {
      store.removeItem(item);
      
    }, []),
    onAddItems: useCallback((code) => {
      store.addToCart(code);
    }, []),
    closeCart: useCallback(() => {
      store.cartCloser();
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls items={store.getState()} onAdd={callbacks.onAdd}/>
      <List items={store.getState().items}
            onItemSelect={callbacks.onSelectItems}
            onAddItems={callbacks.onAddItems}
      />
      <Busket items={store.getState()} eliminate={callbacks.eliminateFromCart} deleter={callbacks.closeCart}/>
    </Layout>
  );
}

export default App;
