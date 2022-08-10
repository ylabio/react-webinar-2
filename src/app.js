import React, { useCallback,useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store, calculationSumPrice }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const callbacks = {
    onAdd: useCallback((item) => {
      store.addItemInBasket(item);
    }, []),
    onDeleteOfBasket: useCallback((code) => {
      store.deleteItem(code);
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
          stateBasket={store.getState().basket}
          onCloseModal={callbacks.onCloseModal}
          onDeleteOfBasket={callbacks.onDeleteOfBasket}
          calculationSumPrice={calculationSumPrice}
        />
      ) : (
        ""
      )}
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          stateBasket={store.getState().basket}
          onDeleteOfBasket={callbacks.onDeleteOfBasket}
          calculationSumPrice={calculationSumPrice}
          onOpenModal={callbacks.onOpenModal}
        />
        <List items={store.getState().items} onAdd={callbacks.onAdd} />
      </Layout>
    </React.Fragment>
  );
}

export default App;
