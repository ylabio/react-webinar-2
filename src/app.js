import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Layout from "./components/layout";
import CartHeader from './components/cart-header';
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  
  const [modalActive, setModalActive] = useState(false)

  const callbacks = {
      onAddToCart: useCallback((item)=>{
      store.addToCart(item);
    },[]),
    onDeleteFromCart:useCallback((code)=>{
      store.deleteFromCart(code);
    },[])
  

  }
  return (
    <Layout head={<h1>Магазин</h1>}>
      {modalActive && <Modal  
      setActive={setModalActive} 
      head={<h1>Корзина</h1>}
      children={<Cart 
        cart={store.getState().cart}
        deleteFromCart={callbacks.onDeleteFromCart}
        totalPrice={store.getState().totalPrice}
      />}
      />}
      <CartHeader cart = {store.getState().cart}
      setActive={setModalActive}   
      totalPrice={store.getState().totalPrice}
      uniqueItemsCount={store.getState().uniqueItemsCount}   
      />
      <List items={store.getState().items}
            onItemDelete={callbacks.onDeleteItems}
            addItem={callbacks.onAddToCart}            
      />
    </Layout>
  );
}

export default App;
