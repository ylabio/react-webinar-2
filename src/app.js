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
  const { items, itemsCart, sumItemsInCart, uniqueItemsInCart } = store.getState();

  const callbacks = {
    onAddItem: useCallback((item) => {
      store.addItemToCart(item);
    }, []),

    onRemoveItem: useCallback((item) => {
      store.removeItemToCart(item);
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
          count={uniqueItemsInCart}
          sum={sumItemsInCart}
          onVisibleModal={callbacks.onVisibleCart} />
        <List
          isCart={callbacks.isCart(items)}
          items={items}
          callback={callbacks.onAddItem}
        />
      </Layout >
      {visibleCart
        ? <Modal head={'Корзина'} onInvisibleModal={callbacks.onInvisibleCart}>
          {uniqueItemsInCart
            ? <>
              <List
                isCart={callbacks.isCart(itemsCart)}
                items={itemsCart}
                callback={callbacks.onRemoveItem}>
              </List>
              <CartSum sum={sumItemsInCart}></CartSum>
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
