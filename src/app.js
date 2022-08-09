import React, {useCallback, useState} from 'react';
import ModalCart from "src/components/modal-cart";
import {numberFormat} from "src/utils";
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isActiveModal, setIsActiveModal] = useState(false)

  const totalSum = numberFormat(store.getState().totalSum)

  const callbacks = {
    onAddToCartItem: useCallback((code) => {
      store.addToCart(code);
    }, []),
    onDeleteToCartItem: useCallback((code) => {
      store.deleteToCart(code);
    }, []),
    onOpenModal: useCallback(() => {
      setIsActiveModal(true)
    }, []),
    onCloseModal: useCallback(() => {
      setIsActiveModal(false)
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls totalSum={totalSum}
                quantityProduct={store.getState().quantityProduct}
                onOpenModal={callbacks.onOpenModal}/>

      <List items={store.getState().items}
            onButton={callbacks.onAddToCartItem}
            titleButton="Добавить"/>

      <ModalCart cart={store.getState().cart}
                 totalSum={totalSum}
                 isActiveModal={isActiveModal}
                 onCloseModal={callbacks.onCloseModal}
                 onDeleteToCartItem={callbacks.onDeleteToCartItem}/>
    </Layout>
  );
}

export default App;
