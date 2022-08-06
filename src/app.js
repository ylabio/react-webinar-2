import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "./components/cart";
import {counter} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({code, title: `Новая запись ${code}`});
    }, []),
    onOpenCart: useCallback(() => {
      store.openModal();
    }, []),
    onCloseCart: useCallback(() => {
      store.closeModal();
    }, []),
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    onDeleteCartItem: useCallback((code) => {
      store.deleteCartItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onOpenCart={callbacks.onOpenCart}
                cartItems={store.getState().cartItems}
      />
      <List items={store.getState().items}
            itemClickHandler={callbacks.onAddItemToCart}
            buttonText='Добавить'
      />
      <Cart cartItems={store.getState().cartItems}
            onCloseCart={callbacks.onCloseCart}
            isOpen={store.getState().isOpen}
            itemClickHandler={callbacks.onDeleteCartItem}
            buttonText='Удалить'
      />
    </Layout>
  );
}

export default App;
