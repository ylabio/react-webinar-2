import React, {useCallback, useState} from 'react';
import Controls from './components/shoppingcart-controls';
import List from './components/list';
import Layout from './components/layout';
import Modal from './components/modal';
import ShoppingCart from './components/shopping-cart';
import ModalHead from './components/modal-head';

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

  const total = store
    .getState()
    .shoppingCart.map(item => item.price * item.amount)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          onOpenCart={callbacks.onOpenCart}
          total={total}
          amount={store.getState().shoppingCart.length}
          cartItems={store.getState().shoppingCart}
        />
        <List
          items={store.getState().items}
          onAction={callbacks.onAddItemToCart}
        />
      </Layout>

      {isModalVisible && (
        <Modal onClose={callbacks.onOpenCart}>
          <Layout
            head={
              <ModalHead headName="Корзина" onAction={callbacks.onOpenCart} />
            }
            modal
          >
            <ShoppingCart
              cartItems={store.getState().shoppingCart}
              onRemoveItem={callbacks.onRemoveItemFromCart}
              total={total}
            />
          </Layout>
        </Modal>
      )}
    </>
  );
}

export default App;
