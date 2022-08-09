import React, {useCallback, useMemo} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const { items, cart, totals, modal } = store.getState();

  const callbacks = {
    addToCart: useCallback((code) => {
      store.addToCart(code);
    }, []),
    onShowCart: useCallback(() => {
      modal = 'open';
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls cart={cart} totals={totals} onShowCart={callbacks.onShowCart}/>
      <List items={items} onItemAdd={callbacks.addToCart}/>
      {modal === 'open' && <Modal />}
    </Layout>
  );
}

export default App;
