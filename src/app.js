import React, { useCallback, useState } from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import Popup from './components/popup';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const items = store.getState().items;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function handleOpenPopup() {
    setIsPopupOpen(!isPopupOpen);
  }

  function handleClosePopup() {
    setIsPopupOpen(false);
  }

  const counter = () => {
    let count = 0;
    items.map((item) => {
      if (item.addCounter > 0) {
        return count++;
      }
      return count;
    });
    return count;
  };

  const totalPrice = () => {
    return items
      .map((item) => {
        return {
          counter: item.addCounter,
          price: item.price,
        };
      })
      .map((item) => {
        return item.counter * item.price;
      })
      .reduce(function (sum, elem) {
        return sum + elem;
      }, 0);
  };

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
        items={items}
        onOpenModal={callbacks.onOpenModal}
        counter={counter()}
        totalPrice={totalPrice()}
      />
      <List items={items} onAddItemToBin={callbacks.onAddItemToBin} />
      <Popup
        name={'Корзина'}
        items={items}
        totalPrice={totalPrice()}
        isOpen={isPopupOpen}
        onCloseModal={callbacks.onCloseModal}
        onDeleteItemFromBin={callbacks.onDeleteItemFromBin}
      />
    </Layout>
  );
}

export default App;
