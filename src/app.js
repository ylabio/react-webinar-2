import React, {useCallback, useState} from 'react';
import Basket from "./components/basket";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';
import BasketResult from './components/basket-result';
import BasketItem from './components/basket-item';
import Item from './components/item';

/**
 * Приложение`  
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onDeleteBasketItems: useCallback((code) => {
      store.deleteBasketItem(code);  // поменять название функции
    }, []),
    onAddItems: useCallback((code) => {
      store.addItem(code); 
    }, []),
    onOpenModal: useCallback(() => {
      store.openModal('basket')
    }, []),
    onCloseModal: useCallback(() => {
      store.closeModal()
    }, []),
  }
  /**
   * Функции для возврата item-node для переиспользования компонента List
   * @param node
   */
  function getMainPageItem(item){
   return <Item item={item} onAdd={callbacks.onAddItems}/>
  }
  function getBasketItem(item){
    return <BasketItem item={item} onDelete={callbacks.onDeleteBasketItems}/>
  }

  const count = store.getState().basket.count;
  const totalSum = store.getState().basket.totalSum;

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Basket onOpenModal={callbacks.onOpenModal} count={count} totalSum={totalSum}/>
        <List items={store.getState().items}
              getItemNode={getMainPageItem}
        />
      </Layout>
      {store.getState().modalTypes['basket'] &&
      <Modal head={<h2>Корзина</h2>} onCloseModal={callbacks.onCloseModal}>
        <List items={store.getState().basket.basketItems}
              getItemNode={getBasketItem}
        />
        <BasketResult totalSum={totalSum} count={count}/>
      </Modal>
      }
    </>
  );
}

export default App;
