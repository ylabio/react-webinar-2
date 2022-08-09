import React, { useCallback, useEffect } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import AppLayout from "./layout/app-layout";
import './global.css';
import Item from './components/item';
import Modal from './shared/ui/modal';
import { getCartItems } from './shared/utils';
import Cart from './components/cart';

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
  const { isCartOpen, items, goods } = store.getState();

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

  useEffect(() => {
    if (goods.total === 0) {
      callbacks.handleModal(false);
    }
  }, [goods.total])
  
  return (
    <>
      {isCartOpen && (
        <Modal closeModal={() => callbacks.handleModal(false)}>
          <Cart 
            items={getCartItems(goods.items)}
            removeItemFromCart={callbacks.removeItemFromCart} 
            closeModal={() => callbacks.handleModal(false)}
            price={goods.price}
            isCartOpen={isCartOpen}
          />
        </Modal>
      )}
      <AppLayout head={<h1>Магазин</h1>}>
        <Controls 
          total={goods.total}
          price={goods.price}
          handleModal={callbacks.handleModal}
        />
        <List 
          cb={callbacks.addItemToCart}
          items={items}
          ListItem={Item}
          isModal={false}
        />
      </AppLayout>
    </>
  );
}

export default App;
