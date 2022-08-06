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

  const { cart, items } = store.getState()
  const countOfItems = Object.keys(cart).length;

  let totalPrice = 0;
  
  if (countOfItems) {
    for (let prop in cart) {
      totalPrice += items[prop]['price']*cart[prop]
    }
  }

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
    setOpenCart: useCallback((isOpenCart) => {
      store.setOpenCart(isOpenCart);
    }, []),
    removeFromCart: useCallback((code) => {
      store.removeFromCart(code);
    }, []),
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls setOpenCart={callbacks.setOpenCart}
                  totalPrice={totalPrice}
                  countOfItems={countOfItems}
        />
        <List items={store.getState().items}
              addToCart={callbacks.addToCart}
        />
      </Layout>
      <Cart setOpenCart={callbacks.setOpenCart}
            removeFromCart={callbacks.removeFromCart}
            state={store.getState()}
            isOpenCart={store.getState().isOpenCart}
            totalPrice={totalPrice}
      />
    </>
  );
}

export default App;
