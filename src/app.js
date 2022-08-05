import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
import Cart from './components/cart';

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
    addToCart: useCallback((code) => {
      store.addToCart(code);
    }, []),
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls cart={store.getState().cart}
                  items={store.getState().items}
                  onAdd={callbacks.onAdd}/>
        <List items={store.getState().items}
              addToCart={callbacks.addToCart}
        />
      </Layout>
      <Cart/>
    </>
  );
}

export default App;
