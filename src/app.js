import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter, useBasket} from "./utils";
import Basket from './components/basket';
import HeaderModal from './components/modal/header-modal';
import ContentModal from './components/modal/content-modal';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */

function App({store}) {
  const [basketCount, sumPrice] = useBasket(store.state.basket);

  const callbacks = {
    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, []),
    onModal: useCallback(() => {
      store.toggleModal();
    }, [])
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <div className='Layout-container'>
          <Basket count={basketCount} sumPrice={sumPrice} />
          <Controls onModal={callbacks.onModal} textButton={'Перейти'} />
        </div>
        <List items={store.getState().items} onItemAdd={callbacks.onAddItem} />
      </Layout>
      <Modal isOpen={store.state.modal} onClose={callbacks.onModal}>
        <HeaderModal onModal={callbacks.onModal} />
        <ContentModal basket={store.state.basket} sum={sumPrice} />
      </Modal>
    </>
  );
}

export default App;
