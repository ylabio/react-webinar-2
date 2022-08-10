import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import Modal from "./components/modal";
import { mergeItems } from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const consolidationItems = mergeItems(store.getState().shoppingCart);
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
      <Controls
        consolidationItems={consolidationItems}
        isMainContent
        setIsOpenedModal={setIsOpenedModal}
      />
      <List
        isMainContent
        items={store.getState().items}
        onAddItemToCart={callbacks.onAddItemToCart}
      />
      {isOpenedModal ? (
        <Modal
          consolidationItems={consolidationItems}
          onItemDelete={callbacks.onDeleteItems}
          setIsOpenedModal={setIsOpenedModal}
        />
      ) : null}
    </Layout>
  );
}

export default App;
