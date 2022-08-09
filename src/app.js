import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Cart from "./components/cart";
import propTypes from "prop-types";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const callbacks = {
    onAddItem: useCallback((code) => {
      store.addItemToCart(code);
      store.calcTotalPrice();
    }, []),
    onDeleteItem: useCallback((code) => {
      store.deleteItemFromCart(code);
      store.calcTotalPrice();
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
        shoppingCart={store.getState().shoppingCart}
        totalPrice={store.getState().totalPrice}
        onModalOpen={callbacks.onModalOpen}
      />
      <List
        items={store.getState().items}
        callback={callbacks.onAddItem}
        callbackName={'Добавить'}
      />
      {
        isModalOpen &&
        <Modal
          head={<h1>Корзина</h1>}
          onModalClose={callbacks.onModalClose}
        >
          <Cart
            shoppingCart={store.getState().shoppingCart}
            totalPrice={store.getState().totalPrice}
            onDeleteItem={callbacks.onDeleteItem}
            callbackName={'Удалить'}
          />
        </Modal>
      }
    </Layout>
  );
}

App.propTypes = {
  store: propTypes.object.isRequired
}

App.defaultProps = {
}

export default App;
