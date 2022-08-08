import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Cart from "./components/cart";
import propTypes from "prop-types";
import {calcTotalPrice} from "./utils";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {shoppingCart} = store.getState();
  const totalPrice = calcTotalPrice(shoppingCart);

  const callbacks = {
    onAddItem: useCallback((code) => {
      store.addItemToCart(code);
    }, []),
    onDeleteItem: useCallback((item) => {
      store.deleteItemFromCart(item);
    }, []),
    onModalOpen: useCallback(() => {
      setIsModalOpen(true);
    }, []),
    onModalClose: useCallback(() => {
      setIsModalOpen(false);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        shoppingCart={shoppingCart}
        onModalOpen={callbacks.onModalOpen}
        totalPrice={totalPrice}
      />
      <List
        items={store.getState().items}
        onAddItem={callbacks.onAddItem}
        callback={callbacks.onAddItem}
        callbackName={'Добавить'}
      />
      <Modal isModalOpen={isModalOpen}>
        <Cart
          shoppingCart={shoppingCart}
          onModalClose={callbacks.onModalClose}
          totalPrice={totalPrice}
          callback={callbacks.onDeleteItem}
          callbackName={'Удалить'}
        />
      </Modal>
    </Layout>
  );
}

App.propTypes = {
  shoppingCart: propTypes.array.isRequired,
  addItemToCart: propTypes.func,
  deleteItemFromCart: propTypes.func,
}
App.defaultProps = {
  shoppingCart: [],
}
export default App;
