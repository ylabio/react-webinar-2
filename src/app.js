import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Layout from "./components/layout";
import CartHeader from './components/cart-header';
import Modal from './components/modal';

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
      <Modal active={modalActive} 
      setActive={setModalActive} 
      cart={store.getState().cart}
      deleteFromCart={callbacks.onDeleteFromCart}
      />
      <CartHeader cart = {store.getState().cart}
      active={modalActive} setActive={setModalActive}      
      
      />
      <List items={store.getState().items}
            onItemSelect={callbacks.onSelectItems}
            onItemDelete={callbacks.onDeleteItems}
            addItem={callbacks.onAddToCart}
            
      />
    </Layout>
  );
}

export default App;
