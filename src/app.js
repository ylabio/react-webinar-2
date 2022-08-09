import React, { useCallback, useState } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Button from './components/button';
import Modal from './components/modal';
import CartSum from './components/cart-sum';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {

  const [visibleCart, setVisibleCart] = useState(false);
  const [sumPrice, setSumPrice] = useState(0);
  const [uniqueItem, setUniqueItem] = useState(0);

  const callbacks = {
    onAddItem: useCallback((item) => {
      store.addItemToCart(item);
      setSumPrice(store.getState().itemsCart.reduce((prev, price) => prev + price.sumPrice, 0));
      setUniqueItem(store.getState().itemsCart.length);
    }, []),

    onRemoveItem: useCallback((item) => {
      store.removeItemToCart(item);
      setSumPrice(store.getState().itemsCart.reduce((prev, price) => prev + price.sumPrice, 0));
      setUniqueItem(store.getState().itemsCart.length);
    }, []),

    onVisibleCart: useCallback(() => {
      setVisibleCart(true);
    }, []),

    onInvisibleCart: useCallback(() => {
      setVisibleCart(false);
    }, []),

    isCart: useCallback((items) => {
      return store.getState().itemsCart === items;
    }, [])
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          count={uniqueItem}
          sum={sumPrice}
          onVisibleModal={callbacks.onVisibleCart} />
        <List
          isCart={callbacks.isCart(store.getState().items)}
          items={store.getState().items}
          callback={callbacks.onAddItem}
        />
      </Layout >
      {visibleCart
        ? <Modal head={'Корзина'} onInvisibleModal={callbacks.onInvisibleCart}>
          {store.getState().itemsCart.length
            ? <>
              <List
                isCart={callbacks.isCart(store.getState().itemsCart)}
                items={store.getState().itemsCart}
                callback={callbacks.onRemoveItem}
                sum={sumPrice}>
              </List>
              <CartSum sum={sumPrice}></CartSum>
            </>
            : <h2>Корзина пуста</h2>
          }
        </Modal >
        : null
      }
    </>
  );
}

export default App;
