import React, { useCallback } from 'react';
import Cart from './components/cart';
import Controls from "./components/controls";
import List from "./components/list";
import AppLayout from "./layout/app-layout";
import './global.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const { 
    addItemToCart, 
    removeItemFromCart, 
    handleModal,
  } = store;
  const { isCartOpen, items, goods } = store.state;

  const callbacks= {
    addItemToCart: useCallback((item) => {
      addItemToCart.call(store, item);
    }, []), 

    removeItemFromCart: useCallback((item) => {
      removeItemFromCart.call(store, item);
    }, []),

    handleModal: useCallback((arg) => {
      handleModal.call(store, arg);
    }, []),
  };
  
  return (
    <>
      {isCartOpen && (
        <Cart 
          goods={goods}
          isCartOpen={isCartOpen}
          removeItemFromCart={callbacks.removeItemFromCart}
          handleModal={callbacks.handleModal}
        />
      )}
      <AppLayout head={<h1>Магазин</h1>}>
        <Controls 
          total={goods.total}
          price={goods.price}
          handleModal={callbacks.handleModal}
        />
        <List 
          addItemToCart={callbacks.addItemToCart}
          items={items}
        />
      </AppLayout>
    </>
  );
}

export default App;
