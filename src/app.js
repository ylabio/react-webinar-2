import React, { useCallback, useState } from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import Drawer from './components/drawer';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const [drawerView, setDrawerView] = useState(false);
  const callbacks = {
    onClickBtn: useCallback((code) => {
      store.deleteItem(code);
    }, []),
    showCart: () => setDrawerView(true),
    closeCart: () => setDrawerView(false),
    addNewInCart: useCallback((code) => {
      store.addInCart(code);
    }, []),
    deleteFromCart: useCallback((code) => {
      store.deleteFromCart(code);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls cart={store.getState().cart} handleClick={callbacks.showCart} />
      <List items={store.getState().items} mainBtn={callbacks.addNewInCart} />
      {drawerView && (
        <Drawer
          cart={store.getState().cart}
          handleClose={callbacks.closeCart}
          mainBtn={callbacks.deleteFromCart}
          btnText={'Удалить'}
        />
      )}{' '}
      {/* Очень хотелось здесь контекст впихнуть на самом деле*/}
    </Layout>
  );
}
export default App;
