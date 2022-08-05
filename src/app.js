import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({ code, title: `Новая запись ${code}` });
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onAddItemToCart: useCallback((item) => {
      store.addItemToCart(item);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls isMainContent setIsOpenedModal={setIsOpenedModal} />
      <List
        isMainContent
        items={store.getState().items}
        onAddItemToCart={callbacks.onAddItemToCart}
      />
      {isOpenedModal ? (
        <Modal
          items={store.getState().shoppingCart}
          onItemDelete={callbacks.onDeleteItems}
          setIsOpenedModal={setIsOpenedModal}
        />
      ) : null}
    </Layout>
  );
}

export default App;
