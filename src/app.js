import React, {useCallback, useMemo, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';
import Cart from './components/cart';

/*
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {shoppingCart, items} = store.getState();

  const callbacks = {

    onAdd: useCallback((item) => {
      store.addItemToCart(item);
    }, []),
    onDelete: useCallback((item) => {
      store.deleteItemFromCart(item);
    }, []),
    onOpenModal: useCallback(() => {
      setIsOpenModal(true);
    }, []),
    onCloseModal: useCallback(() => {
      setIsOpenModal(false);
    },[]),
  };
  
  const callbackButton = useMemo(() => ({action: callbacks.onAdd, name: 'Добавить'}),[])

  return (
      <Layout head={<h1>Магазин</h1>}>
        <Controls 
          onOpenModal={callbacks.onOpenModal}
          totalPrice={shoppingCart.totalPrice}
          countItems={shoppingCart.items.length}
        />
        <List items={items} callback={callbackButton} />
        <Modal isOpened={isOpenModal}>
          <Cart 
            items={shoppingCart.items} 
            onDeleteItem={callbacks.onDelete} 
            onCloseModal={callbacks.onCloseModal}
            totalPrice={shoppingCart.totalPrice}
          />
        </Modal>
      </Layout>
  );
};

export default App;
