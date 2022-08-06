import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    toggleCart: useCallback(() => {
      store.toggleCart();
    }, []),
    addItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    onDeleteCartItems: useCallback((code) => {
      store.deleteCartItems(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls cartItems={store.getState().cartItems}
                toggleCart={callbacks.toggleCart}/>
      <List items={store.getState().items}
            button={callbacks.addItemToCart}
            buttonText={'Добавить'}/>
      {store.getState().isModalActive &&
        <Modal title={'Корзина'}
               isModalActive={store.getState().isModalActive}
               toggleCart={callbacks.toggleCart}
               // cartItems={store.getState().cartItems}
               // deleteCartItems={callbacks.onDeleteCartItems}
               children={<Cart cartItems={store.getState().cartItems}
                               deleteCartItems={callbacks.onDeleteCartItems}/>}/>}
    </Layout>
  );
}

export default App;
