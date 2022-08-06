import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import LayoutModal from "./components/layout-modal";
import ItemBasket from "./components/item-basket";
import Item from "./components/item";

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
    onDeleteItems: useCallback((code) => {
      store.deleteBasketItem(code);
    }, []),
    onAddItems: useCallback((item) => {
      store.addItem(item);
    }, []),
    onCloseModal: useCallback(() => {
      setModalIsOpen(false);
    }, [setModalIsOpen]),
    onOpenModal: useCallback(() => {
      setModalIsOpen(true);
    }, [setModalIsOpen]),
  };

  const getItemBasket = (item) => {
    return <ItemBasket item={item} onDelete={callbacks.onDeleteItems} />;
  };

  const getItem = (item) => {
    return <Item item={item} onAdd={callbacks.onAddItems} />;
  };

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls onAdd={callbacks.onOpenModal} />
        <List items={store.getState().items} viewItem={getItem} />
      </Layout>
      {modalIsOpen ? (
        <LayoutModal title="Корзина" onClose={callbacks.onCloseModal}>
          {store.getState().basket.items.length !== 0 ? (
            <List
              items={store.getState().basket.items}
              viewItem={getItemBasket}
            />
          ) : (
            "В корзине пусто, добавьте товары"
          )}
        </LayoutModal>
      ) : null}
    </>
  );
}

export default App;
