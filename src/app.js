import React, { useCallback } from 'react';
import List from './components/list';
import Layout from './components/layout';
import { counter } from './utils';
import Basket from './components/basket';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({ code, title: `Новая запись ${code}` });
    }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onAddToCart: useCallback((item) => {
      store.addToCart(item);
    }),
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }),
  };

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Basket
        deleteItem={callbacks.onDeleteItem}
        items={store.getState().cart.items}
        cart={store.getState().cart}
      />
      <List addToCart={callbacks.onAddToCart} items={store.getState().items} />
    </Layout>
  );
}

export default App;
