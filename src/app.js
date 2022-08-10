import React, {useCallback, useState} from 'react';
import Cart from "./components/cart";
import List from "./components/list";
import Layout from "./components/layout";
import {Modal} from "./components/modal";
import TotalPrice from "./components/total-price";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isModalOpen, setModalOpen] = useState(false)

  const callbacks = {
    onAddToCart: useCallback((item) => {
      store.addToCart(item);
    }, []),
    deleteFromCart: useCallback((item) => {
      store.deleteFromCart(item);
    }, []),
  }

  const items = store.getState().items;
  const cartItems = Object.values(store.getState().cart.items);
  console.log(cartItems)
  const totalPrice = store.getState().cart.totalPrice;
  const uniqueItems = store.getState().cart.uniqueItems;

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Cart
          totalPrice={totalPrice}
          openCart={setModalOpen}
          uniqueItems={uniqueItems}
        />
        <List items={items} onAddDeleteToCart={callbacks.onAddToCart}/>
      </Layout>
      {isModalOpen &&
        <Modal title='Корзина' closeModal={setModalOpen}>
          <List isCart={true} items={cartItems} onAddDeleteToCart={callbacks.deleteFromCart}/>
          {uniqueItems !== 0 && <TotalPrice totalPrice={totalPrice}/>}
        </Modal>
      }
    </>
  );
}

export default App;
