import React, {useCallback, useState} from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, []),
    onChangeModal: () => {
      setIsOpenModal((prev) => !prev)
    },
    onRemoveToCart: (id) => {
      store.removeToCart(id);
    },
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onChangeModal={callbacks.onChangeModal}
        totalPriceCart={store.getTotalPriceCart()}
        totalNumberInCart={store.getTotalNumberInCart()}
      />
      <List items={store.getState().items}
          btnName={'Добавить'}
          handleAction={callbacks.onAddToCart}
      />
      {isOpenModal &&
        <Modal
          head={<h2>Корзина</h2>}
          onChangeModal={callbacks.onChangeModal}
        >
          <Cart
            items={store.getState().cart}
            onRemoveToCart={callbacks.onRemoveToCart}
            totalPriceCart={store.getTotalPriceCart()}
          />
        </Modal>
      }      
    </Layout>    
  );
}

export default App;
