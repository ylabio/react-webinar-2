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

  const callbacks = {
    toggleCart: useCallback(() => {
      store.toggleCart();
    }, []),
    onAddItemToCart: useCallback((code, item) => {
      store.addItemToCart(code, item);
    }, []),
    onDeleteCartItems: useCallback((code) => {
      store.deleteCartItems(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls cartItems={store.getState().cartItems}
                toggleCart={callbacks.toggleCart}/>
      <List items={store.getState().items}
            button={callbacks.onAddItemToCart}
            buttonText={'Добавить'}/>
      <Modal isModalActive={store.getState().isModalActive}
             toggleCart={callbacks.toggleCart}>
        <Layout head={
          <>
            <h1>Корзина</h1>
            <button onClick={callbacks.toggleCart}>Закрыть</button>
          </>}/>
        <Cart cartItems={store.getState().cartItems}
              deleteCartItems={callbacks.onDeleteCartItems}/>
      </Modal>
    </Layout>
  );
}

export default App;
