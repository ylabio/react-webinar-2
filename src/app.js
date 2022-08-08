import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import {counter} from "./utils";
import './style.css';

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
    onAddToCart: useCallback((code) => {
      store.createCartItem(code);
    },[store.getState().cart.items]),
    onDeleteFromCart: useCallback((code) => {
      store.deleteCartItem(code);
    },[]),
    getCartSum: useCallback(() => {
      return store.getCartSum();
    },[store.getState().cart.sum]),
    getCartCount: useCallback(() => {
      return store.getCartCount();
    },[store.getState().cart.count])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls getCartCount={callbacks.getCartCount} getCartSum={callbacks.getCartSum} onOpen={callbacks.onOpen}/>
      <List items={store.getState().items}
            onAddToCart={callbacks.onAddToCart}
      />
      {show &&
      <Modal show={show} headText='Корзина' onClose={callbacks.onClose}>
        <List   items={store.getState().cart.items} 
                onDeleteFromCart={callbacks.onDeleteFromCart}
        />
        <div className='Modal-summary'>
          <div className='Modal-text'>
            <strong>Итого</strong>
          </div>
          <div className='Modal-stats'>
            <strong>{callbacks.getCartSum()?.toLocaleString()} ₽</strong>
          </div>
        </div>
      </Modal>}
    </Layout>
  );
}

export default App;
