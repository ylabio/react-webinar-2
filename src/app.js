import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import {counter} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [show, setShow] = useState(false);

  const callbacks = {

    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({code, title: `Новая запись ${code}`});
    }, []),

    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),

    onClose: useCallback(() => {
      setShow(false);
    },[]),

    onOpen: useCallback(() => {
      setShow(true)
    },[]),

    onAddToCart: useCallback((item) => {
      store.createCartItem({...item, number: store.getState().cart.length + 1});
    },[store.getState().cart]),
    
    onDeleteFromCart: useCallback((code) => {
      store.deleteCartItem(code);
    },[]),

    ondeleteCartItem: useCallback((code) => {
      store.deleteCartItem(code)
    }, [store.getState().cart]),

    getCartStats: useCallback(() => {
      return {
        count: store.getState().cart.length,
        sumPrice: store.getState().cart.reduce(
          (sum, item) => sum + item.price * item.count,
          0
        )
      }
    },[store.getState().cart])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls getCartStats={callbacks.getCartStats} onOpen={callbacks.onOpen}/>
      <List items={store.getState().items}
            onAddToCart={callbacks.onAddToCart}
      />
      <Modal  getCartStats={callbacks.getCartStats} 
              cart={store.getState().cart} 
              onModalClose={callbacks.onClose} 
              onDeleteFromCart={callbacks.onDeleteFromCart}
              show={show}/>
    </Layout>
  );
}

export default App;
