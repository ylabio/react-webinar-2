import React, { useCallback, useMemo, useState } from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import Modal from './components/modal';
import Cart from './components/cart';
import Item from './components/item';

/*
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [modal, setModal] = useState({
    isOpened: false,
    title: '',
    nameComponent: '',
  });
  const { shoppingCart, items } = store.getState();

  const callbacks = {
    onAdd: useCallback((item) => {
      store.addItemToCart(item);
    }, []),
    onDelete: useCallback((item) => {
      store.deleteItemFromCart(item);
    }, []),
    onOpenModal: useCallback(({ title, nameComponent }) => {
      setModal({
        ...modal,
        isOpened: true,
        title,
        nameComponent: nameComponent.toLowerCase(),
      });
    }, []),
    onCloseModal: useCallback(() => {
      setModal({ ...modal, isOpened: false, title: '', nameCopmonent: '' });
    }, []),
  };

  // как вариант перенес в объект компонент для children модалки
  // чтобы рендерить по переданому названию соответсвующий компонент
  const modalContent = {
    cart: {
      title: 'Корзина',
      component: useCallback(() => (
        <Cart
          items={shoppingCart.items}
          onDeleteItem={callbacks.onDelete}
          onCloseModal={callbacks.onCloseModal}
          totalPrice={shoppingCart.totalPrice}
        />
      )),
    },
  };

  const callbackButton = useMemo(
    () => ({ action: callbacks.onAdd, name: 'Добавить' }),
    []
  );

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        onOpenModal={callbacks.onOpenModal}
        totalPrice={shoppingCart.totalPrice}
        countItems={shoppingCart.items.length}
      />
      <List items={items} callback={callbackButton} component={Item} />
      {modal.isOpened && (
        <Modal
          isOpened={modal.isOpened}
          title={modal.title}
          onCloseModal={callbacks.onCloseModal}
        >
          {modalContent[modal.nameComponent].component()}
        </Modal>
      )}
    </Layout>
  );
}

export default App;
