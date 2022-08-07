import React, { useCallback, useState } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import item from './components/item';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {

  const [sumPrice, setSumPrice] = useState(0);
  const [countItem, setCountItem] = useState(0);

  const callbacks = {
    onAddItem: useCallback((item) => {
      store.addItemToCart(item);
      setSumPrice(sumPrice + item.price);
      setCountItem(store.getState().itemsCart.length);
    }, [sumPrice]),

    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls count={countItem} sum={sumPrice} />
      <List items={store.getState().items}
        onAddCart={callbacks.onAddItem}
      />
    </Layout>
  );
}

export default App;
