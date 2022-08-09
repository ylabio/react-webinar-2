import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";

import Modal from "./components/modal";
import ModalForm from "./components/modal-form";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const callbacks = {
    onAdd: useCallback(
      (item) => {
        store.onAdd(item);
      },
      [store]
    ),

    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),

    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  };
  const [toggle, setToggle] = useState(false);

  const toggleOnClick = () => setToggle(!toggle);

  const total = store
    .getState()
    .orders.map((order) => order.total)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        onAdd={callbacks.onAdd}
        toggleOnClick={toggleOnClick}
        orders={store.getState().orders}
        total={total}
      />
      <List onAdd={callbacks.onAdd} items={store.getState().items} />
      {toggle && (
        <Modal onCloseModal={toggleOnClick}>
          <ModalForm
            toggleOnClick={toggleOnClick}
            orders={store.getState().orders}
            onItemDelete={callbacks.onDeleteItems}
            total={total}
          />
        </Modal>
      )}
    </Layout>
  );
}

export default App;
