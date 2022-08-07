import React, { useCallback, useState } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import item from './components/item';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {

  const [sumPrice, setSumPrice] = useState(0);
  const [countItem, setCountItem] = useState(0);
  const [visibleCart, setVisibleCart] = useState(false);

  const callbacks = {
    onAddItem: useCallback((item) => {
      store.addItemToCart(item);
      setSumPrice(sumPrice + item.price);
      setCountItem(store.getState().itemsCart.length);
    }, [sumPrice]),

    onVisibleCart: useCallback(() => {
      setVisibleCart(true);
    }),

    onInvisibleCart: useCallback(() => {
      setVisibleCart(false);
    }),

    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls count={countItem} sum={sumPrice} onVisibleCart={callbacks.onVisibleCart} />
      <List items={store.getState().items}
        onAddCart={callbacks.onAddItem}
      />
      <Cart head={<h1>Корзина</h1>} visible={visibleCart} onInvisibleCart={callbacks.onInvisibleCart}>
        {store.getState().itemsCart.length
          ? <List items={store.getState().itemsCart}></List>
          : <h1>Корзина пуста</h1>
        }
      </Cart>
    </Layout>
  );
}

export default App;
