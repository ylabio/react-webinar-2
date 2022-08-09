import React, {useCallback, useState} from 'react';
import ModalCart from "src/components/modal-cart";
import {numberFormat, sumProducts} from "src/utils";
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

  const quantityProduct = store.getState().cart.length
  const totalSum = numberFormat(sumProducts(store.getState().cart))

  const callbacks = {
    onAddToCartItem: useCallback((product) => {
      store.addToCart(product);
    }, []),
    onDeleteToCartItem: useCallback((product) => {
      store.deleteToCart(product);
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
      <Controls cart={store.getState().cart}
                totalSum={totalSum}
                quantityProduct={quantityProduct}
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
