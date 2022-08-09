import React, { useCallback, useState } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Cart from "./components/cart";
import Layout from "./components/layout";
import { counter } from "./utils";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  //const [totalCount, setTotalCount] = useState(0)
  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({ code, title: `Новая запись ${code}` });
    }, []),
    onShowModal: useCallback(() => {
      store.showModal();
    }, []),
    onHideModal: useCallback(() => {
      store.hideModal();
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, [store.getState().cartItems]),
    onAddCartItems: useCallback((code) => {
      store.addCartItems(code);
    }, [store.getState().cartItems])
  }
  let totalPrice = store.getState().cartItems.reduce((sum, item) => sum + item.price * item.addCount, 0);
  let totalCount = store.getState().cartItems.reduce((sum, item) => { return sum + item.addCount }, 0)
  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls showModal={callbacks.onShowModal} totalCount={totalCount} totalPrice={totalPrice} />
      <List items={store.getState().items}
        onItemDelete={callbacks.onDeleteItems}
        onItemAddCart={callbacks.onAddCartItems}
      />
      <Modal store={store} show={store.getState().showModal} hide={callbacks.onHideModal} onDelete={callbacks.onDeleteItems} totalPrice={totalPrice} />
    </Layout>
  );
}

export default App;
