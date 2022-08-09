import React, { useCallback, useState } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Button from './components/button';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [visibleCart, setVisibleCart] = useState(false);

  const callbacks = {
    onAddItem: useCallback((item) => {
      store.addItemToCart(item);
    }, []),

    onVisibleCart: useCallback(() => {
      setVisibleCart(true);
    }, []),

    onInvisibleCart: useCallback(() => {
      setVisibleCart(false);
    }, []),

    onRemoveItem: useCallback((item) => {
      store.removeItemToCart(item);
    }, []),

    getCartProps: useCallback(() => {
      let itemsCart = store.getState().itemsCart;
      if (itemsCart.length) {
        return {
          sumPrice: itemsCart.reduce((prevPrice, currentPrice) => prevPrice + currentPrice.sumPrice, 0),
          count: itemsCart.length
        }
      } else {
        return {
          sumPrice: 0,
          count: 0
        }
      }
    }, []),

    isCart: useCallback((items) => {
      return store.getState().itemsCart === items;
    }, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        count={callbacks.getCartProps().count}
        sum={callbacks.getCartProps().sumPrice}
        onVisibleCart={callbacks.onVisibleCart} />
      <List
        isCart={callbacks.isCart(store.getState().items)}
        items={store.getState().items}
        callback={callbacks.onAddItem}
      />
      <Modal visible={visibleCart}>
        <Layout head={<>
          <h1>Корзина</h1>
          <Button onClick={callbacks.onInvisibleCart}>Закрыть</Button>
        </>}>
          {store.getState().itemsCart.length
            ? <List
              isCart={callbacks.isCart(store.getState().itemsCart)}
              items={store.getState().itemsCart}
              callback={callbacks.onRemoveItem}
              sum={callbacks.getCartProps().sumPrice}>
            </List>
            : <h2>Корзина пуста</h2>
          }
        </Layout>
      </Modal>
    </Layout>
  );
}

export default App;
