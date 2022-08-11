import React, { useCallback, useState } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import { ModalLayout } from './components/modal-layout/ModalLayout';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  console.log(store)

  const [openModal, setOpenModal] = useState(false)


  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({ code, title: `Новая запись ${code}` });
    }, []),
    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),
    onAddItemToCard: useCallback((code) => {
      store.addItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <ModalLayout
      onItemDeleteFromCart={callbacks.onDeleteFromCart}
      key={store.getState().cart.code}
      cart={store.getState().cart}
      setOpenModal={setOpenModal}
      openModal={openModal}
      totalPrice={store.getState().totalPrice}
      />
      <Controls
        totalPrice={store.getState().totalPrice}
        openModal={openModal}
        setOpenModal={setOpenModal}
        productsCount={store.getState().productsCount}
      />
      <List
        items={store.getState().items}
        cards={store.getState().cards}
        onAddItemToCard={callbacks.onAddItemToCard}
      />
    </Layout>
  );
}

export default App;
