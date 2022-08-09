import React, {useCallback, useEffect, useState} from 'react';
import plural from 'plural-ru'
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [cartLabel, setCartLabel] = useState('пусто')
  
  useEffect(()=>{
    if (store.getState().cartAmount === 0) setCartLabel('пусто')
    else setCartLabel(plural(store.getState().cartAmount, '%d товар / ', '%d товара / ', '%d товаров / ') + store.getState().cartSum.toLocaleString('ru-RU') + ' ₽')
  }, [store.getState().cartAmount, store.getState().cartSum])

  const callbacks = {
    toggleModal: useCallback(() => {
      store.toggleModal();
    }, []),
    onAddCart: useCallback((code) => {
      store.addCart(code);
    }, []),
    onDeleteCart: useCallback((code) => {
      store.deleteCart(code);
    }, []),
  }

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>} >
      <Controls cartLabel={cartLabel} openCart={callbacks.toggleModal} />
      <List items={store.getState().items} onItemAddCart={callbacks.onAddCart} />
      {store.getState().isModal && <Modal head={<h1>Корзина</h1>} onClose={callbacks.toggleModal}>
        <Cart items={store.getState().cart} cartSum={store.getState().cartSum} onDeleteCart={callbacks.onDeleteCart} />
      </Modal>}
    </Layout>
  );
}

export default App;
