import React, {useCallback, useState} from 'react';
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

  //onAddItems добавление в коризну, DeleteItems удаление в корзине
  //setModal установка видимости модального окна
  const callbacks = {
    onAddItems: useCallback((code) => {
      store.addInCart(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    setModal: useCallback((number) => {
      store.setModal(number);
    }, [])
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls counterItems={store.getState().total[0].totalItems}
                  counterTotalPrice={store.getState().total[0].totalPrice}
                  cart={store.getState().cart}
                  openCart={callbacks.setModal}/>
        <List items={store.getState().items}
              onSelect={callbacks.onAddItems}
        />
      </Layout>
      {store.getState().modal[0].visible && <Modal head={'Корзина'} setActive={callbacks.setModal}>
        <Cart cart={store.getState().cart}
              onItemDelete={callbacks.onDeleteItems}
              counterTotalPrice={store.getState().total[0].totalPrice}
        />
      </Modal>}
    </>        
  );
}

export default App;
