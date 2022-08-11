import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';
import {cn as bem} from "@bem-react/classname";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
const [modalActive, setModalActive]=useState(false);
const cn = bem('Modal');
  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({code, title: `Новая запись ${code}`});
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onCartItems: useCallback((code) => {
      store.addToCart(code);
    }, []),
    onDeteleCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),
  }

  return (
    
    <Layout head={<h1>Магазин</h1>}>      
      <Controls setModalActive={setModalActive} cart={store.getState().cart} />
      {modalActive?<Modal head={<h1>Корзина</h1>} setModalActive={setModalActive}>
            <List cart={store.getState().cart} 
                  onDeteleCart={callbacks.onDeteleCart} 
                  place={'cart'}
                  />
            </Modal>:''}
      <List items={store.getState().items}
            onCartItems={callbacks.onCartItems}
            place={'store'}
      />
    </Layout>
  );
}

export default App;
