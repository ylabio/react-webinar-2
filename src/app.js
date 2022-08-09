import React, {useCallback, useState} from 'react';
import List from './components/list'
import Layout from './components/layout';
import Cart from './components/cart';
import Modal from './components/modal';
import Item from './components/item'
import CartModal from './components/cart/cart-modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const callbacks = {
    onAdd: useCallback((item) => {
      store.addToCart(item)
    }, []),
    onDelete: useCallback((item) => {
      store.deleteFromCart(item)
    }, []),
    onModalClose: useCallback(() => {
      setIsModalOpen(false)
    }, []),
    onModalOpen: useCallback(() => {
      setIsModalOpen(true)
    }, [])
  }

  return (
    <Layout head={<h1>Магазин</h1>} isModalOpen={isModalOpen}>
      <Cart itemsQuantity={store.getState().cart.itemsQuantity}
            totalPrice={store.getState().cart.totalPrice}
            onModalOpen={callbacks.onModalOpen}
      />
      <List items={store.getState().items} 
            renderItem={(item) => (
              <Item key={item.code} 
                    item={item} 
                    buttonText={"Добавить"}
                    onButtonClick={callbacks.onAdd} 
              />
            )}
      /> 
      {isModalOpen && 
        <Modal title={"Корзина"} onClose={callbacks.onModalClose}>
          <CartModal cart={store.getState().cart}
                     onDelete={callbacks.onDelete}
          />
        </Modal>
      }
    </Layout>
  );
}

export default App;
