import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Basket from "./components/basket";

import { counter } from "./utils";

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

  const TotalPrice = store
    .getState()
    .orders.map((order) => order.total)
    .reduce((prev, curr) => prev + curr, 0);
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
            totalPrice={TotalPrice}
          />
        </Modal>
      )}
      <Controls
        openModal={toggleModal}
        orders={store.getState().orders}
        totalPrice={TotalPrice}
      />
      <List items={store.getState().items} onAdd={callbacks.onAddItem} />
    </Layout>
  );
}

export default App;
