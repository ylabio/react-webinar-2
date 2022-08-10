import React, { useCallback, useState } from "react";
import List from "./components/primitives/list";
import Layout from "./components/primitives/layout";
import CartPreview from "./components/cart-components/cart-preview";
import Modal from "./components/primitives/modal";
import EmptyContent from "./components/primitives/empty-content";
import Item from "./components/item";
import Cart from "./components/cart-components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalHandler = () => {
    setIsModalOpen((condition) => !condition);
  };

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    onItemDeletedFromCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, []),
  };

  return (
    <div>
      <Layout head={<h1>Магазин</h1>}>
        <CartPreview
          cartTotal={store.getState().cartTotalCost}
          currency={store.getState().currency}
          openCartModal={modalHandler}
          uniqItemsInCart={store.getState().uniqItemsInCart}
        />
        <List items={store.getState().items}>
          {(item) => (
            <li key={item.code}>
              <Item
                item={item}
                currency={store.getState().currency}
                onAddToCart={callbacks.onAddToCart}
              />
            </li>
          )}
        </List>
      </Layout>
      {isModalOpen && (
        <Modal closeModal={modalHandler} title={<p>Корзина</p>}>
          {store.getState().uniqItemsInCart ? (
            <Cart
              cart={store.sortedCart}
              currency={store.getState().currency}
              cartTotalCost={store.getState().cartTotalCost}
              onItemDeletedFromCart={callbacks.onItemDeletedFromCart}
            />
          ) : (
            <EmptyContent>
              <p>Ваша корзина пуста.</p>
            </EmptyContent>
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
