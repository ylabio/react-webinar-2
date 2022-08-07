import React, {useCallback, useState} from 'react';
import Basket from "./components/basket";
import List from "./components/list";
import BasketList from './components/basket-list';
import Layout from "./components/layout";
import Modal from './components/modal';
import BasketResult from './components/basket-result';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [isModalVisible, setIsModalVisible] = useState(false)

  const callbacks = {
    onDeleteBasketItems: useCallback((code) => {
      store.deleteBasketItem(code);  // поменять название функции
    }, []),
    onAddItems: useCallback((code) => {
      store.addItem(code); 
    }, []),
    onOpenModal: useCallback(() => {
      setIsModalVisible(true)
    }, []),
    onCloseModal: useCallback(() => {
      setIsModalVisible(false)
    }, []),
  }

  const count = store.getState().basket.count;
  const totalSum = store.getState().basket.totalSum;

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Basket onOpenModal={callbacks.onOpenModal} count={count} totalSum={totalSum}/>
        <List items={store.getState().items}
              onItemAdd={callbacks.onAddItems}
        />
      </Layout>
      {isModalVisible &&
      <Modal head={<h2>Корзина</h2>} onCloseModal={callbacks.onCloseModal}>
        <BasketList items={store.getState().basket.basketItems}
                onBasketItemDelete={callbacks.onDeleteBasketItems}
        />
        <BasketResult totalSum={totalSum} count={count}/>
      </Modal>
      }
    </>
  );
}

export default App;
