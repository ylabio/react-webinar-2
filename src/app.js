import React, {useCallback, useEffect, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
import Cart from './components/cart';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [cartState, setCartState] = useState({amount: 0, total: 0});

  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({code, title: `Новая запись ${code}`});
    }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, []),
    onOpenCart: useCallback(() => {
      setIsShowModal(true);
    }, []),
    onCloseModal: useCallback(() => {
      setIsShowModal(false);
    }, [])
  }

  useEffect(() => {
    const { cart } = store.getState();
    if (cart.length) {
      const amount =  cart.length === 1
        ? cart[0].amount
        : cart.reduce((total, next, index) => (
          index === 1
            ? total.amount + next.amount
            : total + next.amount
        ));
      const total = cart.length === 1
        ? Math.round(cart[0].price * cart[0].amount) 
        : cart.reduce((total, next, index) => (
          index === 1
            ? (total.price * total.amount) + (next.price * next.amount)
            : total + (next.price * next.amount)
        ))
      setCartState({amount, total});
    }
  }, [store.getState().cart])

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onClick={callbacks.onOpenCart}>
          {(!!cartState.amount) && (
            <Cart
              amount={cartState.amount}
              total={cartState.total}
            />)}
        </Controls>
      <List items={store.getState().items}
            onItemSelect={callbacks.onSelectItems}
            onItemDelete={callbacks.onDeleteItems}
            onItemAddToCart={callbacks.onAddToCart}
      />
      <Modal isShow={isShowModal}
             onClose={callbacks.onCloseModal}
             head={<h1>Корзина</h1>}>
        <p>place for cart items</p>
      </Modal>
    </Layout>
  );
}

export default App;
