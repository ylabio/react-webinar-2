import React, {useCallback, useState} from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import {counter} from './utils';
import Modal from './components/modal';
import ShoppingCart from './components/shoppingCart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isModalVisible, toggleModal] = useState(false);

  const callbacks = {
    onOpenCart: useCallback(() => {
      toggleModal(prevState => !prevState);
    }, []),

    onAddItemToCart: useCallback(code => {
      store.addItemToCart(code);
    }, []),

    onRemoveItemFromCart: useCallback(code => {
      store.removeItemFromCart(code);
    }, [])
  };

  const modalHead = (
    <>
      <h1>Корзина</h1>
      <button onClick={callbacks.onOpenCart}>Закрыть</button>
    </>
  );

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          onOpenCart={callbacks.onOpenCart}
          cartItems={store.getState().shoppingCart}
        />
        <List
          items={store.getState().items}
          onAction={callbacks.onAddItemToCart}
        />
      </Layout>

      {isModalVisible && (
        <Modal onClose={callbacks.onOpenCart}>
          <Layout head={modalHead} modal>
            <ShoppingCart
              cartItems={store.getState().shoppingCart}
              onRemoveItem={callbacks.onRemoveItemFromCart}
            />
          </Layout>
        </Modal>
      )}
    </>
  );
}

export default App;
