import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import CartTotal from "./components/cart-total";


/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [modalOpen, setModalOpen] = React.useState(false)

  const callbacks = {
    isModalOpened: useCallback(() => {
      setModalOpen(!modalOpen)
    }, [modalOpen, setModalOpen]),
    addToCart: useCallback((code) => {
      store.addCartItem(code);
    }, []),
    removeFromCart: useCallback((code) => {
      store.removeCartItem(code);
    }, [])
  }


  return (
    <>
      {modalOpen && 
        <Modal title={'Корзина'} onClickClose={callbacks.isModalOpened}>
          <List items={store.getState().cartItems}
                onClickButton={callbacks.removeFromCart}
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
              onClickButton={callbacks.addToCart}/>
      </Layout>
    </>
  );
}

export default App;
