import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Cart from "./components/cart";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
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
    <Layout head={<h1>Магазин</h1>}>
      <Controls cart={store.getState().cart}
                onCartOpen={callbacks.onCartOpen}/>
      <List items={store.getState().items}
            onButtonClick={callbacks.onItemAddition}
            getItem={props => <Item {...props} />}/>
      {store.getState().cart.isOpened ?
        <Modal onClose={callbacks.onCartClose}
               title={'Корзина'}>
          <Cart onItemDeletion={callbacks.onItemDeletion}
                items={store.getState().cart.items}
                total={store.getState().cart.total}/>
        </Modal> : null
      }
    </Layout>
  );
}

export default App;
