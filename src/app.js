import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const cartModalTitle = 'Корзина';
  const layoutMainHead = <h1>Магазин</h1>;

  const callbacks = {
    onItemAddition: useCallback((item) => {
      store.addItemToCart(item);
    }, []),
    onItemDeletion: useCallback((item) => {
      store.deleteItemFromCart(item);
    }, []),
    onCartOpen: useCallback(() => {
      store.openCart();
    }, []),
    onCartClose: useCallback(() => {
      store.closeCart();
    }, [])
  }

  return (
    <Layout head={layoutMainHead}>
      <Controls cart={store.getState().cart}
                onCartOpen={callbacks.onCartOpen}/>
      <List items={store.getState().items}
            onButtonClick={callbacks.onItemAddition}/>
      <Modal active={store.getState().cart.isOpened}
             onClose={callbacks.onCartClose}
             title={cartModalTitle}>
        <Cart onItemDeletion={callbacks.onItemDeletion}
              items={Object.values(store.getState().cart.items)}
              total={store.getState().cart.total}/>
      </Modal>
    </Layout>
  );
}

export default App;
