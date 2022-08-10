import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import { counter } from "./utils";
import Modal from "./components/modal";
import Item from "./components/item";
import CartItem from "./components/cart-item";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modalIsActive, setModalIsActive] = useState(false);

  const showModal = useCallback(() => {
    setModalIsActive(!modalIsActive);
  }, [modalIsActive]);
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

  const renders = {
    renderItem: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.onAddItem} />;
      },
      [callbacks.onAddItem]
    ),
    renderCartItem: useCallback(
      (item) => {
        return <CartItem item={item} onDeleteItem={callbacks.onDeleteItem} />;
      },
      [callbacks.onAddItem]
    ),
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
          renderItem={renders.renderItem}
          items={store.getState().items}
          cartPrice={store.getState().totalCartPriceAndCount}
        />
      </Layout>
      {modalIsActive && (
        <Modal
          showModal={showModal}
          modalName="Корзина"
          cartPrice={store.state.totalCartPriceAndCount}
        >
          <List
            renderItem={renders.renderCartItem}
            items={store.getState().cart}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
