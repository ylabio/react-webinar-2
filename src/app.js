import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Basket from './components/basket';
import HeaderModal from './components/modal/header-modal';
import ContentModal from './components/modal/content-modal';
import Modal from './components/modal';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */

function App({store}) {

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
          <Basket count={store.state.basketCount} sumPrice={store.state.sumPrice} />
          <Controls onModal={callbacks.onModal} textButton={'Перейти'} />
        </div>
        <List
          items={store.getState().items}
          callback={callbacks.onAddItem}
          text={'Добавить'}
          component={Item}
        />
      </Layout>
      <Modal isOpen={store.state.modal} onClose={callbacks.onModal}>
        <HeaderModal onModal={callbacks.onModal} />
        <ContentModal
          basket={store.state.basket}
          sum={store.state.sumPrice}
          isOpen={store.state.modal}
          delete={callbacks.onDeleteItem}
        />
      </Modal>
    </>
  );
}

export default App;
