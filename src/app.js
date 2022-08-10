import React, { useCallback, useState } from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import { counter } from './utils';
import Modal from './components/modal';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({ code, title: `Новая запись ${code}` });
    }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    onCartClose: useCallback(() => {
      setIsCartOpen(false);
    }),
    onCartOpen: useCallback(() => {
      setIsCartOpen(true);
    }),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls cart={store.getState().cart} onCartOpen={callbacks.onCartOpen} />
      {isCartOpen && (
        <Modal onClose={callbacks.onCartClose} title='Корзина'>
          <Cart cart={store.getState().cart} onItemDelete={callbacks.onDeleteItems} />
        </Modal>
      )}
      <List
        items={store.getState().items}
        onItemSelect={callbacks.onSelectItems}
        onItemDelete={callbacks.onDeleteItems}
      />
    </Layout>
  );
}

export default App;
