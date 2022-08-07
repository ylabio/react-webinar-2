import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';
import BasketInfo from './components/basket-info';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modal, setModal] = useState(false);
  const callbacks = {
    onDeleteItem: useCallback((item) => {
      store.deleteItem(item);
    }, []),
    switchModal: useCallback(() => {
      setModal(!modal);
    }, [modal]),
    addItem: useCallback((item) => {
      store.addToBasket(item)
    }, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketInfo basket={store.getState().basket} switchModal={callbacks.switchModal} />
      <List items={store.getState().items}
        callBack={callbacks.addItem}
        buttonTitle={"Добавить"}
      />
      {
        modal ?
          <Modal
            title="Корзина"
            switchModal={callbacks.switchModal}
            basket={store.getState().basket}
            deleteItem={callbacks.onDeleteItem}
          />
          :
          null
      }
    </Layout>
  );
}

export default App;
