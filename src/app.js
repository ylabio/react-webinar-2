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
  const [cartState, setCartState] = useState({items: [],amount: 0, total: 0});

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
    onRemoveFromCart: useCallback((code) => {
      store.deleteItemCart(code);
    }, []),
    onOpenCart: useCallback(() => {
        setIsShowModal(true);
    }, []),
    onCloseModal: useCallback(() => {
      setIsShowModal(false);
    }, [])
  }

  useEffect(() => {
    const { amount, total, products } = store.getState().cart;
    const items = products.map((product) => ({
      ...store.getState().items.filter((item) => item.code === product.code)[0],
      amount: product.amount,
    }))
    setCartState({items, amount, total});
  }, [store.getState().cart])

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onClick={callbacks.onOpenCart}>
        <Cart
          amount={cartState.amount}
          total={cartState.total}
        />
      </Controls>
      <List items={store.getState().items}
            onItemDelete={callbacks.onDeleteItems}
            onItemAddToCart={callbacks.onAddToCart}
      />
      <Modal isShow={isShowModal}
             onClose={callbacks.onCloseModal}
             head={<h1>Корзина</h1>}>
        <List items={cartState.items}
              isCart
              total={cartState.total}
              onItemDelete={callbacks.onRemoveFromCart}
        />
      </Modal>
    </Layout>
  );
}

export default App;
