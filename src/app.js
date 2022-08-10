import React, {useCallback, useState} from 'react';
import List from "./components/list";
import CartList from "./components/cart-list";
import Layout from "./components/layout";
import Controls from "./components/controls";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  // Открытие модалки
  const [modal, setModal] = useState(false);

  const callbacks = {
    handleShowModal: useCallback(() => {
      setModal(!modal);
    }, [setModal, modal]),
    onItemAdd: useCallback((code) => {
      store.addToCart(code);
    }, []),
    onItemDelete: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      {modal && <Modal
        title={'Корзина'}
        handleShowModal={callbacks.handleShowModal}
      >
        {store.getState().cartItems.length ?
          <CartList
            cart={store.getState().cartItems}
            onItemDelete={callbacks.onItemDelete}
            sumInCart={store.getState().sumTotal}
          /> :
          <p className={'Modal-empty'}>В корзине пока пусто</p>
        }
      </Modal>}
      <Controls
        handleShowModal={callbacks.handleShowModal}
        sumInCart={store.getState().sumTotal}
        amountUnique={store.getState().amountUnique}
      />
      <List items={store.getState().items}
            onItemAdd={callbacks.onItemAdd}
      />
    </Layout>
  );
}

export default App;
