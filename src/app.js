import React, { useCallback, useState } from "react";
import BasketInfo from "./components/basket-info";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import LayoutModal from "./components/layout-modal";
import ItemBasket from "./components/item-basket";
import Item from "./components/item";
import BasketTotal from "./components/basket-total";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { amount, sum } = store.getState().basket;
  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({ code, title: `Новая запись ${code}` });
    }, []),
    onDeleteItems: useCallback((item) => {
      store.deleteBasketItem(item);
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
        <BasketInfo amount={amount} sum={sum} onOpen={callbacks.onOpenModal} />
        <List items={store.getState().items} viewItem={getItem} />
      </Layout>
      {modalIsOpen ? (
        <LayoutModal title="Корзина" sum={sum} onClose={callbacks.onCloseModal}>
          {store.getState().basket.items.length !== 0 ? (
            <>
              <List
                items={store.getState().basket.items}
                viewItem={getItemBasket}
              />
              <BasketTotal sum={sum} />
            </>
          ) : (
            <div>В корзине пусто, добавьте товары</div>
          )}
        </LayoutModal>
      ) : null}
    </>
  );
}

export default App;
