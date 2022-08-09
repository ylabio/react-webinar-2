import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Cart from "./components/cart";
import ModalHeader from "./components/modal/modal-header";
import CartTotalPrice from "./components/cart/cart-total-price";
import CartList from "./components/cart/cart-list";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const state = store.getState();

  const callbacks = {
    toggleModalShow: useCallback(() => {
      store.toggleModalShow();
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
      <Controls cartTotalPrice={state.cartTotalPrice}
                cartUniqItemAmount={state.cartUniqItemAmount}
                toggleModalShow={callbacks.toggleModalShow}/>
      <List items={state.items}
            addItemToCart={callbacks.onAddItemToCart}/>
      {state.isModalActive &&
        <Modal toggleModalShow={callbacks.toggleModalShow}>
          <ModalHeader title='Корзина'
                       toggleModalShow={callbacks.toggleModalShow}/>
          <Cart>
            {state.cartUniqItemAmount !== 0 && <>
                <CartList items={state.cartItems}
                          deleteCartItems={callbacks.onDeleteCartItems}/>
                <CartTotalPrice cartTotalPrice={state.cartTotalPrice}/></>}
          </Cart>
        </Modal>}
    </Layout>
  );
}

export default App;
