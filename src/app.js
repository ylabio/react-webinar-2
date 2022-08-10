import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import CartTotal from "./components/cart-total";
import Layout from "./components/layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [open, setOpen] = useState(false)

  const callbacks = {
    isModalOpened: useCallback(() => {
      setOpen(!open)
    }, [open, setOpen]),
    onAddToCart: useCallback((code) => {
      store.createCartItem(code);
    }, []),
    onDeleteFromCart: useCallback((code) => {
      store.deleteCartItem(code);
    }, [])
  }

  return (
    <>
      {open && 
        <Modal title={'Корзина'} onClickClose={callbacks.isModalOpened}>
          <List items={store.getState().cartItems}
                onClickButton={callbacks.onDeleteFromCart}
                onCart/>
          <CartTotal totalPrice={store.getState().totalPrice}
                     totalCount={store.getState().totalCount}/>
        </Modal>
      }
      <Layout head={<h1>Магазин</h1>}>
        <Controls isModalOpened={callbacks.isModalOpened}
                  totalPrice={store.getState().totalPrice}
                  totalCount={store.getState().totalCount}/>
        <List items={store.getState().items}
              onClickButton={callbacks.onAddToCart}/>
      </Layout>
    </>
  );
}

export default App;
