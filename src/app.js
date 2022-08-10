import React, {useCallback, useState} from 'react';
import Controls from "./components/Controls";
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

  const [showModal, setShowModal] = useState(false)

  const callbacks = {
    onAddProduct: useCallback((code, title, price) => {
      store.addItem(code, title, price);
    }, []),
    onDeleteProduct: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onCloseModal: useCallback(() => {
      setShowModal(false);
    }, []),
    onOpenModal: useCallback(() => {
      setShowModal(true);
    }, []),
  }

  return (<>
        <Layout head={<h1>Магазин</h1>}>
          <Controls cart={store.getState().cart}
                    cartParams={store.getState().cartParams}
                    onOpenModal={callbacks.onOpenModal}/>
          <List items={store.getState().items}
                onAddProduct={callbacks.onAddProduct}/>
        </Layout>
        {showModal && <Modal title={'Корзина'}
                             onCloseModal={callbacks.onCloseModal}>
          <Cart cart={store.getState().cart}
                cartParams={store.getState().cartParams}
                onDeleteProduct={callbacks.onDeleteProduct}/>
        </Modal>}
      </>
  );
}

export default App;
