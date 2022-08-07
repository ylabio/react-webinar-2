import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "./components/cart"
import {cartCounter} from './utils'

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [open, setOpen] = useState(false)

  const callbacks = {
    isCartOpened: useCallback(() => {
      setOpen(!open)
    }, [setOpen, open]),
    onAddToCart: useCallback((title, price) => {
      const code = cartCounter();
      store.createCartItem({code, title, price});
    }, []),
    onDeleteFromCart: useCallback((code) => {
      store.deleteCartItem(code);
    }, []),
  }
  
  return (
    <Layout head={<h1>Магазин</h1>}>
      {open && <Cart isCartOpened={callbacks.isCartOpened}
                     totalPrice={store.getState().totalPrice}
                     cartItems={store.getState().cartItems}
                     onDeleteFromCart={callbacks.onDeleteFromCart}/>}
      <Controls isCartOpened={callbacks.isCartOpened}
                totalPrice={store.getState().totalPrice}
                cartItemsLength={store.getState().cartItems.length}/>
      <List items={store.getState().items}
            onClickButton={callbacks.onAddToCart}
      />
    </Layout>
  );
}

export default App;
