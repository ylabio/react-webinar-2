import React, { useCallback, useState } from "react";
import Header from "./components/header";
import List from "./components/list";
import Layout from "./components/layout";
import Cart from "./components/cart";
import { getItemsQuantity, getTotalPrice } from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modal, setModal] = useState(false); // модальное окно
  const cartItems = store.getCartItems(); // Корзина
  const totalPrice = getTotalPrice(cartItems); // Полная стоимость всех товаров
  const ItemsQuantity = getItemsQuantity(cartItems); // Количество товаров

  const { items } = store.getState();

  console.log("items,", items);

  const callbacks = {
    toggleModal: useCallback(() => {
      setModal(!modal);
    }, [modal, setModal]),
    addItemInCart: useCallback((code) => {
      store.addItemInCart(code);
    }, []),
    removeItem: useCallback((code) => {
      store.removeItem(code);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Header
        totalPrice={totalPrice}
        cartLength={cartItems.length}
        showModal={callbacks.toggleModal}
        ItemsQuantity={ItemsQuantity}
      />
      <List
        items={store.getState().items}
        addItemInCart={callbacks.addItemInCart}
      />
      {modal && (
        // По нормальному я бы не стал так передавать пропсы, делал бы черед редакс, а так получается что я передаю пропсы через 2 компонента
        <Cart
          cartItems={cartItems}
          totalPrice={totalPrice}
          closeModal={callbacks.toggleModal}
          removeItem={callbacks.removeItem}
        />
      )}
    </Layout>
  );
}

export default App;
