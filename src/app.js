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

    onDeleteItems: useCallback(code => {
      store.deleteItem(code);
    }, [])
  };

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          onOpenCart={callbacks.onOpenCart}
          cartItems={store.getState().shoppingCart}
        />
        <List
          items={store.getState().items}
          onAddItemToCart={callbacks.onAddItemToCart}
          onItemSelect={callbacks.onSelectItems}
          onItemDelete={callbacks.onDeleteItems}
        />
      </Layout>

      {isModalVisible && (
        <Modal onClose={callbacks.onOpenCart}>
          <ShoppingCart cartItems={store.getState().shoppingCart} />
        </Modal>
      )}
    </>
  );
}

export default App;
