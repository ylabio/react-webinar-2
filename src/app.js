import React, { useCallback, useState } from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import { Modal } from './components/modal/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  console.log(store)

  const [openModal, setOpenModal] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)

  React.useEffect(() => {
    setTotalPrice(
      store.getState().cart.reduce((acc, item) => {
        return acc + item.price * item.count;
      }, 0)
    );
  }, [store.getState().cart]);

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
      {
        openModal
        &&
        <Modal
          onItemDeleteFromCart={callbacks.onDeleteFromCart}
          key={store.getState().cart.code}
          cart={store.getState().cart}
          setOpenModal={setOpenModal}
          totalPrice={totalPrice}
        />
      }
      <Controls
        totalPrice={totalPrice}
        openModal={openModal}
        setOpenModal={setOpenModal}
        cart={store.getState().cart}
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
