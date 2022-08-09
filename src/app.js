import React, {useCallback, useState} from 'react';
import {getCurrencyPrice} from './utils'; 
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
  const {totalNumber, totalPrice} = store.getState().cart;
  const totalCurrencyPrice = getCurrencyPrice(totalPrice); // Формирует представление цены в виде '1000 Р'

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
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls onChangeModal={callbacks.onChangeModal}
          totalCurrencyPrice={totalCurrencyPrice}
          totalNumberInCart={totalNumber}
        />
        <List items={store.getState().items}
            btnName={'Добавить'}
            handleAction={callbacks.onAddToCart}
        />        
      </Layout>
      {isOpenModal &&
        <Modal
          head={<h2>Корзина</h2>}
          onChangeModal={callbacks.onChangeModal}
        >
          <Cart
            items={store.getState().cart.items}
            onRemoveToCart={callbacks.onRemoveToCart}
            totalCurrencyPrice={totalCurrencyPrice}
          />
        </Modal>
      }
    </>
  );
}

export default App;
