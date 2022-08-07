import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import {counter} from "./utils";
import LayoutModal from "./components/layout-modal";
import Item from "./components/item";
import ItemBasket from "./components/item-basket";
import BasketSimple from "./components/basket-simple";
import BasketTotal from "./components/basket-total";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const state = store.getState();

  const [modal, setModal] = useState(null);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => {
      setModal('basket');
    }, [setModal]),

    // Закрытие любой модалки
    closeModal: useCallback(() => {
      setModal(null);
    }, [setModal]),

    // Добавлени в корзину
    addToBasket: useCallback(code => {
      store.get('basket').addToBasket(code);
    }, []),

    // Удаление из корзины
    removeFromBasket: useCallback(code => {
      store.get('basket').removeFromBasket(code);
    }, [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
    itemBasket: useCallback(item => <ItemBasket item={item} onRemove={callbacks.removeFromBasket}/>, []),
  }

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={state.basket.amount} sum={state.basket.sum}/>
        <List items={state.catalog.items} renderItem={renders.item}/>
      </Layout>
      {modal === 'basket' && (
        <LayoutModal title="Корзина" onClose={callbacks.closeModal}>
          <List items={state.basket.items} renderItem={renders.itemBasket}/>
          <BasketTotal sum={state.basket.sum}/>
        </LayoutModal>
      )}
    </>
  );
}

export default App;
