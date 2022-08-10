import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import Modal from "./components/modal";
import CartPrice from "./components/cart-price";
import CartList from "./components/cart-list";
import ModalHeader from "./components/modal-header";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modalIsActive, setModalIsActive] = useState(false);

  const showModal = () => {
    setModalIsActive(!modalIsActive);
  };
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
  };

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          showModal={showModal}
          allItems={store.getState().cart.length}
          priceAndCount={store.getState().totalCartPriceAndCount}
          onAdd={callbacks.onAdd}
        />
        <List
          items={store.getState().items}
          onAddItem={callbacks.onAddItem}
          cartPrice={store.getState().totalCartPriceAndCount}
        />
      </Layout>
      {modalIsActive && (
        <Modal
          showModal={showModal}
          modalName="Корзина"
          cartPrice={store.state.totalCartPriceAndCount}
        >
          <CartList
            cart={store.getState().cart}
            onDeleteItem={callbacks.onDeleteItem}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
