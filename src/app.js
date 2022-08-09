import React, { useCallback } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import Modal from "./components/modal";
import CartPrice from "./components/cart-price";
import CartList from "./components/cart-list";
import ModalLayout from "./components/modal-layout";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({ code, title: `Новая запись ${code}` });
    }, []),
    onAddItem: useCallback((code) => {
      store.addCartItem(code);
    }, []),
    onDeleteItem: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),
    showModal: useCallback(() => {
      store.showModal();
    }, []),
  };

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          showModal={callbacks.showModal}
          allItems={store.getState().cart.length}
          priceAndCount={store.getState().totalCartPriceAndCount}
          onAdd={callbacks.onAdd}
        />
        <List items={store.getState().items} onAddItem={callbacks.onAddItem} />
      </Layout>
      {store.state.modalIsActive && (
        <Modal showModal={callbacks.showModal} modalName="Корзина">
          <ModalLayout showModal={callbacks.showModal} modalName={"Корзина"} />
          <CartList
            cart={store.getState().cart}
            onDeleteItem={callbacks.onDeleteItem}
          />
          <CartPrice cartPrice={store.getState().totalCartPriceAndCount} />
        </Modal>
      )}
    </>
  );
}

export default App;
