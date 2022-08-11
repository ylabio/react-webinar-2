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
    }, [store.getState().cartItems, store.getState().totalCount, store.getState().totalPrice])
  }
  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls showModal={callbacks.onShowModal} totalCount={store.getState().totalCount} totalPrice={store.getState().totalPrice} />
      <List items={store.getState().items}
        onItemDelete={callbacks.onDeleteItems}
        onItemAddCart={callbacks.onAddCartItems}
      />
      <Modal cartItems={store.getState().cartItems} show={store.getState().showModal} hide={callbacks.onHideModal} onDelete={callbacks.onDeleteItems} totalPrice={store.getState().totalPrice} />
    </Layout>
  );
}

export default App;
