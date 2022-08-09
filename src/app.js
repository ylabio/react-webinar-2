import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import Cart from "./components/cart";
import ModalHeader from "./components/modal/modal-header";
import CartTotalPrice from "./components/cart/cart-total-price";

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
            button={callbacks.onAddItemToCart}
            buttonText={'Добавить'}/>
      {state.isModalActive &&
        <Modal toggleModalShow={callbacks.toggleModalShow}>
          <ModalHeader title='Корзина'
                       toggleModalShow={callbacks.toggleModalShow}/>
          <Cart>
            {state.cartUniqItemAmount !== 0 && <>
                <List items={state.cartItems}
                      button={callbacks.onDeleteCartItems}
                      buttonText={'Удалить'}/>
                <CartTotalPrice cartTotalPrice={state.cartTotalPrice}/></>}
          </Cart>
        </Modal>}
    </Layout>
  );
}

export default App;
