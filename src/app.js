import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import LayoutModal from "./components/layout-modal";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({ code, title: `Новая запись ${code}` });
    }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onCloseModal: useCallback(() => {
      setModalIsOpen(false);
    }, [setModalIsOpen]),
    onOpenModal: useCallback(() => {
      setModalIsOpen(true);
    }, [setModalIsOpen]),
  };

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls onAdd={callbacks.onOpenModal} />
        <List
          items={store.getState().items}
          onItemSelect={callbacks.onSelectItems}
          onItemDelete={callbacks.onDeleteItems}
        />
      </Layout>
      {modalIsOpen ? (
        <LayoutModal
          title="Корзина"
          onClose={callbacks.onCloseModal}
        ></LayoutModal>
      ) : null}
    </>
  );
}

export default App;
