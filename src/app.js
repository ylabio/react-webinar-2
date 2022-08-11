import React, { useCallback,useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import ListBasket from "./components/list-basket";
import {conversionCurrency} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const totalPrice = conversionCurrency(store.getState().total.price);

  const callbacks = {
    onAdd: useCallback((item) => {
      store.addItemInBasket(item);
    }, []),
    onDeleteOfBasket: useCallback((item) => {
      store.deleteItem(item);
    }, []),
    onOpenModal: useCallback( () => {
      setIsOpenModal(true);
    }, [isOpenModal]),
    onCloseModal: useCallback( () => {
      setIsOpenModal(false);
    }, [isOpenModal])
  };

  return (
    <React.Fragment>
      {isOpenModal ? (
        <Modal
          title='Корзина'
          buttonName='Закрыть'
          onCloseModal={callbacks.onCloseModal}
        >
          <ListBasket 
            stateBasket={store.getState().basket} 
            onDeleteOfBasket={callbacks.onDeleteOfBasket} 
            totalPrice={totalPrice} />
        </Modal>
      ) : (
        ""
      )}
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          stateBasket={store.getState().basket}
          onDeleteOfBasket={callbacks.onDeleteOfBasket}
          totalPrice={totalPrice} 
          totalAmount={store.getState().total.amount}
          onOpenModal={callbacks.onOpenModal}
        />
        <List items={store.getState().items} onAdd={callbacks.onAdd} />
      </Layout>
    </React.Fragment>
  );
}

export default App;
