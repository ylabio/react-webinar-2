import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {useCartCalc} from "./utils";
import Cart from './components/cart';
import HeaderModal from './components/modal/header';
import ContentModal from './components/modal/content';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */

function App({store}) {
  const [cartCount, totalPrice] = useCartCalc(store.state.cart);

  const callbacks = {
    onAddItem: useCallback((item) => {
      store.addItem(item);
    }, []),
    onDeleteItem: useCallback((item) => {
      store.deleteItem(item.code);
    }, []),
    onModal: useCallback(() => {
      store.toggleModal();
    }, [])
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <div className='Layout-container'>
          <Cart count={cartCount} totalPrice={totalPrice} />
          <Controls onModal={callbacks.onModal} textButton={'Перейти'} />
        </div>
        <List
          items={store.getState().items}
          callback={callbacks.onAddItem}
          text={'Добавить'}
        ></List>
      </Layout>
      <Modal isOpen={store.state.modal} onClose={callbacks.onModal}>
        <HeaderModal onModal={callbacks.onModal} />
        <ContentModal
          cart={store.state.cart}
          sum={totalPrice}
          isOpen={store.state.modal}
          delete={callbacks.onDeleteItem}
        />
      </Modal>
    </>
  );
}

export default App;
