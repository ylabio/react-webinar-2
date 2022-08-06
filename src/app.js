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
    onAddToCart: useCallback((item) => {
      store.createCartItem({...item, number: store.getState().cart.length + 1});
    },[store.getState().cart]),
    onDeleteFromCart: useCallback((code) => {
      store.deleteCartItem(code);
    },[]),
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
      <Modal show={show}>
        <Layout head={<><h1>Корзина</h1> <button onClick={callbacks.onClose}>Закрыть</button></>}>
          <List   items={store.getState().cart} 
                  onDeleteFromCart={callbacks.onDeleteFromCart}
          />
          <div className='Modal-summary'>
            <div className='Modal-text'>
              <strong>Итого</strong>
            </div>
            <div className='Modal-stats'>
              <strong>{callbacks.getCartStats().sumPrice.toLocaleString()} ₽</strong>
            </div>
          </div>
        </Layout>
      </Modal>
    </Layout>
  );
}

export default App;
