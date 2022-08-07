import React, { useCallback } from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import { counter } from './utils';
import CartModal from './components/cartModal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [activeCartModal, setActiveCartModal] = React.useState(false);

  const callbacks = {
    onAdd: useCallback(() => {
      const code = counter();
      store.createItem({ code, title: `Новый товар ${code}` });
    }, []),
    onAddItem: useCallback((code, title, price) => {
      store.addItem(code, title, price);
    }, []),
    onOpenCart: useCallback(() => {
      setActiveCartModal(true);
    }, []),
    onCloseCart: useCallback(() => {
      setActiveCartModal(false);
    }, []),
    onSelectItems: useCallback((code) => {
      store.selectItem(code);
    }, []),
    onDeleteItems: useCallback((code, price, count) => {
      store.deleteItem(code, price, count);
    }, []),
  };

  return (
    <>
      <Layout head={<h1>Магазин</h1>}>
        <Controls
          totalPrice={store.getState().totalPrice}
          totalCount={store.getState().totalCount}
          cartItems={store.getState().cart}
          onOpenCart={callbacks.onOpenCart}
        />
        <List
          items={store.getState().items}
          onAddItem={callbacks.onAddItem}
          onItemSelect={callbacks.onSelectItems}
          btnTitle='Добавить'
        />
      </Layout>
      {activeCartModal && (
        <CartModal
          totalPrice={store.getState().totalPrice}
          onCloseCart={callbacks.onCloseCart}
          cartItems={store.getState().cart}
          onItemDelete={callbacks.onDeleteItems}
        />
      )}
    </>
  );
}

export default App;
