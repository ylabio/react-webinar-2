import React, { useCallback, useState } from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import Popup from './components/modal';
import { counter } from './utils';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function handleOpenPopup() {
    setIsPopupOpen(!isPopupOpen);
  }

  function handleClosePopup() {
    setIsPopupOpen(false);
  }

  const counter = store.state.items
    .map((item) => {
      return item.addCounter;
    })
    .reduce(function (sum, elem) {
      return sum + elem;
    }, 0);

  const newObj = store.state.items.map((item) => {
    const obj = {
      counter: item.addCounter,
      price: item.price,
    };
    return obj;
  });

  const totalPrice = newObj
    .map((item) => {
      return item.counter * item.price;
    })
    .reduce(function (sum, elem) {
      return sum + elem;
    }, 0);

  const callbacks = {
    onOpenModal: useCallback(() => {
      handleOpenPopup();
    }, []),
    onCloseModal: useCallback(() => {
      handleClosePopup();
    }, []),
    onAddItemToBin: useCallback((code) => {
      store.addItemToBin(code);
    }, []),
    onDeleteItemFromBin: useCallback((code) => {
      store.DeleteItemFromBin(code);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        items={store.getState().items}
        onOpenModal={callbacks.onOpenModal}
        counter={counter}
        totalPrice={totalPrice}
      />
      <List
        items={store.getState().items}
        onAddItemToBin={callbacks.onAddItemToBin}
      />
      <Popup
        items={store.getState().items}
        counter={counter}
        totalPrice={totalPrice}
        isOpen={isPopupOpen}
        onCloseModal={callbacks.onCloseModal}
        onDeleteItemFromBin={callbacks.onDeleteItemFromBin}
      />
    </Layout>
  );
}

export default App;
