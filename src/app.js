import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
const [modalActive, setModalActive]=useState(false);

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
      <Modal cart={store.getState().cart} 
            active={modalActive} 
            setActive={setModalActive} 
            onDeteleCart={callbacks.onDeteleCart}/>
      <List items={store.getState().items}
            onCartItems={callbacks.onCartItems}
      />
    </Layout>
  );
}

export default App;
