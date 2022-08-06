import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
import Popup from './components/popup';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const[isPopupOpen, setIsPopupOpen] = useState(false);
  
  const callbacks = {
    // onAdd: useCallback(() => {
    //   const code = counter();
    //   store.createItem({code, title: `Новая запись ${code}`});
    // }, []),
    // onSelectItems: useCallback((code) => {
    //   store.selectItem(code);
    // }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onAddToCart: useCallback((code)=> {
      store.addToCartItem(code)
    }, []),
    onPopupOpen: useCallback((code)=> {
      setIsPopupOpen(code)
    }, [setIsPopupOpen]),
  }
console.log(store)
  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls cart={store.getState().cart} onAdd={callbacks.onAdd} onPopupOpen={callbacks.onPopupOpen}/>
      <List items={store.getState().items}
            // onItemSelect={callbacks.onSelectItems}
            onItemDelete={callbacks.onDeleteItems}
            onAddToCart={callbacks.onAddToCart}
            isOpen={isPopupOpen}
      />
      <Popup isActive={store.getState().cart.isOpened} title={'Корзина'}>
        <Cart cartItems={store.getState().cart.cartItems}/>
      </Popup>
    </Layout>
  );
}

export default App;
