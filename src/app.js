import React, { useCallback } from 'react';
import List from './components/list';
import Layout from './components/layout';
import Controls from './components/controls';
import Modal from './components/modal';
import CartItem from './components/cart-item';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const callbacks = {
    onAddToCart: useCallback((code) => {
      store.addToCart(code);
    }, []),
    onDeleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),
  };

  return (
    <Layout head={<h1>Приложение на чистом JS</h1>}>
      <Controls
        cart={store.getState().cart}
        setIsModalOpen={setIsModalOpen}
      ></Controls>

      <List
        items={store.getState().items}
        onItemAddToCart={callbacks.onAddToCart}
      >
        <Item />
      </List>

      {isModalOpen && (
        <Modal
          header={<h2>Корзина</h2>}
          setIsModalOpen={setIsModalOpen}
          footer={
            <p>
              Итого
              <span>
                {new Intl.NumberFormat('ru', {
                  style: 'currency',
                  currency: 'RUB',
                  minimumFractionDigits: 0,
                }).format(store.getState().cart.totalPrice)}
              </span>
            </p>
          }
        >
          <List
            items={store.getState().cart.cartItems}
            onItemDeleteFromCart={callbacks.onDeleteFromCart}
          >
            <CartItem />
          </List>
        </Modal>
      )}
    </Layout>
  );
}

export default App;
