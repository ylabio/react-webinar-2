import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [showCart, setShowCart] = useState(false)

  const callbacks = {
    openCart: useCallback(() => {
      setShowCart(true)
    }, []),
    closeCart: useCallback(() => {
      setShowCart(false)
    }, []),
    addItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    deleteItemFromCart: useCallback((code) => {
      store.deleteItemFromCart(code)
    }, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls openCart={callbacks.openCart} cartItems={store.getState().cartItems}/>
      <List items={store.getState().items} action={{actionName: 'Добавить', callback: callbacks.addItemToCart}}/>
      {showCart && <Cart cartItemsList={store.getState().cartItems} closeCart={callbacks.closeCart} deleteItemFromCart={callbacks.deleteItemFromCart}/>}
    </Layout>
  );
}

export default App;
