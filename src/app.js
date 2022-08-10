import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Basket from "./components/basket";


/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
    
  const callbacks = {
    onAddItem: useCallback(
      (item) => {
        store.addItemToBasket(item);
      },
      [store]
    ),

    deleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      {modal && (
        <Modal>
          <Basket
            closeModal={toggleModal}
            orders={store.getState().orders}
            deleteItem={callbacks.deleteItem}
            totalPrice={store.getState().total}
            head={<h1>Корзина</h1>}
            uniqueOrder={store.getState().uniqueOrder}
          />
        </Modal>
      )}
      <Controls
        openModal={toggleModal}
        orders={store.getState().orders}
        totalPrice={store.getState().total}
        uniqueOrder={store.getState().uniqueOrder}
      />
      <List items={store.getState().items} onAdd={callbacks.onAddItem} />
    </Layout>
  );
}

export default App;
