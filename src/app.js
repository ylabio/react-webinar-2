import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Cart from "./components/cart";
import Item from "./components/item";
import CartItem from "./components/cart-item";
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
    onOpenModal: useCallback(() => {
      store.openModal();
    }, []),
    onCloseModal: useCallback(() => {
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
      <Controls onOpenCart={callbacks.onOpenModal}
                cartItems={store.getState().cartItems}
                cartItemsAmount={store.getState().cartItemsAmount}
                cartTotalPrice={store.getState().cartTotalPrice}
      />
      <List items={store.getState().items}
            onAddItemToCart={callbacks.onAddItemToCart}
            component={Item}
      />
      {store.getState().isOpen &&
        <Modal onCloseModal={callbacks.onCloseModal}
               title='Корзина'
        >
          <Cart cartItems={store.getState().cartItems}
                onDeleteCartItem={callbacks.onDeleteCartItem}
                cartTotalPrice={store.getState().cartTotalPrice}
                component={CartItem}
          />
        </Modal>
      }

    </Layout>
  );
}

export default App;
