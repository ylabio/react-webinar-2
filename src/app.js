import React, {useCallback, useState} from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const callbacks = {
    // add будет модалка
    // onAdd: useCallback(() => {
    //   const code = counter();
    //   store.createItem({code, title: `Новая запись ${code}`});
    // }, []),
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, []),
    onChangeModal: () => {
      setIsOpenModal((prev) => !prev)
    },
    onRemoveToCart: (id) => {
      store.removeToCart(id);
    },
    // onDeleteItems: useCallback((code) => {
    //   store.deleteItem(code);
    // }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onChangeModal={callbacks.onChangeModal}
        totalPriceCart={store.getTotalPriceCart()}
        totalNumberInCart={store.getTotalNumberInCart()}
      />
      <List items={store.getState().items}
          onAddToCart={callbacks.onAddToCart}
      />
      {isOpenModal &&
        <Modal
          items={store.getState().cart}
          onChangeModal={callbacks.onChangeModal}
          onRemoveToCart={callbacks.onRemoveToCart}
          totalPriceCart={store.getTotalPriceCart()}
        >
        </Modal>}
      
    </Layout>
    
  );
}

export default App;
