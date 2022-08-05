import React, {useCallback, useState} from 'react';
import Basket from "./components/basket";
import List from "./components/list";
import BasketList from './components/basket-list';
import Layout from "./components/layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [isModalVisible, setIsModalVisible] = useState(false)

  const callbacks = {
    onDeleteBasketItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onAddItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onOpenModal: useCallback(() => {
      setIsModalVisible(true)
    }, []),
    onCloseModal: useCallback(() => {
      setIsModalVisible(false)
    }, []),
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Basket onOpenModal={callbacks.onOpenModal}/>
        <List items={store.getState().items}
              onItemAdd={callbacks.onAddItems}
        />
      </Layout>
      {isModalVisible &&
      <Modal head={<h2>Корзина</h2>} onCloseModal={callbacks.onCloseModal}>
        <BasketList items={store.getState().basket.basketItems}
                onBasketItemDelete={callbacks.onDeleteBasketItems}
        />
      </Modal>
      }
    </>
  );
}

export default App;
