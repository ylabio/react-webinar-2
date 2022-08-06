import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal"

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [show, setShow] = useState()

  const callbacks = {
    onCartClose: useCallback(() => {
      setShow(false);
    }, []),
    onCartOpen: useCallback(() => {
      setShow(true);
    }, []),
    onAddItemToCart: useCallback((item) => {
      store.addItemToCart(item);
    }, []),
    onDeleteItemFromCart: useCallback((item) => {
      console.log(item) 
      store.deleteItemFromCart(item);
    }, []),
    getCartState: useCallback(() => {
      const cart = store.getState().cart;
      return {
        count: cart.length,
        priceSum: cart.reduce((sum, item) => sum + item.price * item.amount, 0)
      }
    }, [store.getState().cart]),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls getCartState={callbacks.getCartState} onCartOpen={callbacks.onCartOpen}/>
      <List items={store.getState().items}
            btnHandle={callbacks.onAddItemToCart}
            btnText='Добавить'
      />
      <Modal
        getCartState={callbacks.getCartState}
        cart={store.getState().cart}
        onCartClose={callbacks.onCartClose}
        onDeleteItemFromCart={callbacks.onDeleteItemFromCart}
        show={show}/>
    </Layout>
  );
}

export default App;
